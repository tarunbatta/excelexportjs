#!/bin/bash

# Helper script to process Dependabot PRs for auto-merge
# Usage: ./process_pr.sh <pr_number> [mergeable_state] [draft]

set -e

PR_NUMBER="$1"
MERGEABLE_STATE="$2"
DRAFT="$3"

echo "=== Processing PR #$PR_NUMBER ==="

# If mergeable_state and draft not provided, fetch them
if [ -z "$MERGEABLE_STATE" ] || [ -z "$DRAFT" ]; then
    echo "Fetching PR details..."
    PR_INFO=$(gh pr view "$PR_NUMBER" --json mergeStateStatus,isDraft,title,author,state,mergeable,reviewDecision)
    MERGEABLE_STATE=$(echo "$PR_INFO" | jq -r '.mergeStateStatus')
    DRAFT=$(echo "$PR_INFO" | jq -r '.isDraft')
    TITLE=$(echo "$PR_INFO" | jq -r '.title')
    AUTHOR=$(echo "$PR_INFO" | jq -r '.author.login')
    STATE=$(echo "$PR_INFO" | jq -r '.state')
    MERGEABLE=$(echo "$PR_INFO" | jq -r '.mergeable')
    REVIEW_DECISION=$(echo "$PR_INFO" | jq -r '.reviewDecision')
    
    echo "PR Title: $TITLE"
    echo "Author: $AUTHOR"
    echo "State: $STATE"
    echo "Mergeable: $MERGEABLE"
    echo "Merge State Status: $MERGEABLE_STATE"
    echo "Is Draft: $DRAFT"
    echo "Review Decision: $REVIEW_DECISION"
    
    # Check if it's actually a Dependabot PR
    if [ "$AUTHOR" != "dependabot[bot]" ] && [ "$AUTHOR" != "app/dependabot" ]; then
        echo "PR #$PR_NUMBER is not from Dependabot (author: $AUTHOR), skipping"
        exit 0
    fi
fi

# Skip if PR is in draft state
if [ "$DRAFT" = "true" ]; then
    echo "PR #$PR_NUMBER is in draft state, skipping auto-merge"
    exit 0
fi

# Skip if PR is not mergeable
if [ "$MERGEABLE" = "false" ]; then
    echo "PR #$PR_NUMBER is not mergeable, skipping auto-merge"
    exit 0
fi

# Check if PR needs review approval
if [ "$REVIEW_DECISION" = "CHANGES_REQUESTED" ]; then
    echo "PR #$PR_NUMBER has changes requested, skipping auto-merge"
    exit 0
fi

# Wait a bit for checks to complete if not clean
if [ "$MERGEABLE_STATE" != "clean" ] && [ "$MERGEABLE_STATE" != "CLEAN" ]; then
    echo "PR #$PR_NUMBER is not ready for merge. Status: $MERGEABLE_STATE"
    echo "Waiting 60 seconds for checks to complete..."
    sleep 60
    
    # Re-check status
    UPDATED_INFO=$(gh pr view "$PR_NUMBER" --json mergeStateStatus,mergeable)
    MERGEABLE_STATE=$(echo "$UPDATED_INFO" | jq -r '.mergeStateStatus')
    MERGEABLE=$(echo "$UPDATED_INFO" | jq -r '.mergeable')
    echo "Updated mergeable state: $MERGEABLE_STATE"
    echo "Updated mergeable: $MERGEABLE"
fi

# Check if PR is ready for merge
if [ "$MERGEABLE_STATE" = "clean" ] || [ "$MERGEABLE_STATE" = "CLEAN" ]; then
    if [ "$MERGEABLE" = "true" ] || [ "$MERGEABLE" = "MERGEABLE" ]; then
        echo "PR #$PR_NUMBER is ready for merge, enabling auto-merge..."
        
        # Try to enable auto-merge with squash strategy
        echo "Attempting squash merge..."
        if gh pr merge --auto --squash "$PR_NUMBER"; then
            echo "✅ Auto-merge enabled for PR #$PR_NUMBER (squash)"
            gh pr comment "$PR_NUMBER" --body "🤖 Auto-merge enabled! This PR will be automatically merged once all checks pass."
            exit 0
        fi
        
        echo "Squash merge failed, trying merge commit..."
        if gh pr merge --auto --merge "$PR_NUMBER"; then
            echo "✅ Auto-merge enabled for PR #$PR_NUMBER (merge commit)"
            gh pr comment "$PR_NUMBER" --body "🤖 Auto-merge enabled! This PR will be automatically merged once all checks pass."
            exit 0
        fi
        
        echo "Merge commit failed, trying rebase..."
        if gh pr merge --auto --rebase "$PR_NUMBER"; then
            echo "✅ Auto-merge enabled for PR #$PR_NUMBER (rebase)"
            gh pr comment "$PR_NUMBER" --body "🤖 Auto-merge enabled! This PR will be automatically merged once all checks pass."
            exit 0
        fi
        
        echo "❌ All merge strategies failed for PR #$PR_NUMBER"
        
        # Try to get more details about why it failed
        echo "Getting PR details to understand failure..."
        PR_DETAILS=$(gh pr view "$PR_NUMBER" --json mergeStateStatus,mergeable,reviewDecision)
        echo "PR Details: $PR_DETAILS"
        
        gh pr comment "$PR_NUMBER" --body "🤖 Auto-merge failed. Please review manually. Status: $MERGEABLE_STATE"
        exit 1
    else
        echo "❌ PR #$PR_NUMBER merge state is clean but not mergeable: $MERGEABLE"
    fi
else
    echo "❌ PR #$PR_NUMBER merge state is not clean: $MERGEABLE_STATE"
fi

echo "❌ PR #$PR_NUMBER is still not ready for merge."
echo "Mergeable State: $MERGEABLE_STATE"
echo "Mergeable: $MERGEABLE"

# Get more details about why it's not ready
echo "Getting detailed PR status..."
PR_STATUS=$(gh pr view "$PR_NUMBER" --json mergeStateStatus,mergeable,reviewDecision,state)
echo "PR Status: $PR_STATUS"

gh pr comment "$PR_NUMBER" --body "🤖 Auto-merge skipped - PR not ready for merge (status: $MERGEABLE_STATE, mergeable: $MERGEABLE). Will retry when ready."
exit 0 