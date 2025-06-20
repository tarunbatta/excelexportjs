#!/bin/bash

# Diagnostic script to understand why Dependabot PRs aren't being merged
# Usage: ./diagnose_prs.sh

set -e

echo "=== Dependabot PR Diagnostic Report ==="
echo "Repository: $(gh repo view --json nameWithOwner -q .nameWithOwner)"
echo "Date: $(date)"
echo "======================================"

# Get all open Dependabot PRs
echo "Fetching all open Dependabot PRs..."
DEPENDABOT_PRS=$(gh pr list --author "app/dependabot" --state open --json number,title,mergeStateStatus,isDraft,state,mergeable,reviewDecision,mergeState)

# Count PRs
PR_COUNT=$(echo "$DEPENDABOT_PRS" | jq length)
echo "Found $PR_COUNT Dependabot PRs"
echo ""

if [ "$PR_COUNT" -eq 0 ]; then
    echo "No Dependabot PRs found!"
    exit 0
fi

# Process each PR
echo "$DEPENDABOT_PRS" | jq -r '.[] | "\(.number)|\(.title)|\(.mergeStateStatus)|\(.isDraft)|\(.state)|\(.mergeable)|\(.reviewDecision)|\(.mergeState)"' | while IFS='|' read -r pr_number title merge_state_status is_draft state mergeable review_decision merge_state; do
    echo "=== PR #$pr_number ==="
    echo "Title: $title"
    echo "State: $state"
    echo "Is Draft: $is_draft"
    echo "Mergeable: $mergeable"
    echo "Merge State Status: $merge_state_status"
    echo "Review Decision: $review_decision"
    echo "Merge State: $merge_state"
    
    # Determine why PR can't be merged
    if [ "$is_draft" = "true" ]; then
        echo "❌ BLOCKED: PR is in draft state"
    elif [ "$mergeable" = "false" ]; then
        echo "❌ BLOCKED: PR is not mergeable"
    elif [ "$merge_state_status" != "clean" ]; then
        echo "❌ BLOCKED: PR merge state status is '$merge_state_status' (needs 'clean')"
    elif [ "$review_decision" = "CHANGES_REQUESTED" ]; then
        echo "❌ BLOCKED: Changes requested in review"
    elif [ "$review_decision" = "REVIEW_REQUIRED" ]; then
        echo "❌ BLOCKED: Review required"
    elif [ "$state" != "OPEN" ]; then
        echo "❌ BLOCKED: PR state is '$state' (needs 'OPEN')"
    else
        echo "✅ READY: PR appears ready for auto-merge"
    fi
    
    echo ""
done

echo "=== Summary ==="
echo "Total Dependabot PRs: $PR_COUNT"

# Count by status
DRAFT_COUNT=$(echo "$DEPENDABOT_PRS" | jq '[.[] | select(.isDraft == true)] | length')
NOT_MERGEABLE_COUNT=$(echo "$DEPENDABOT_PRS" | jq '[.[] | select(.mergeable == false)] | length')
NOT_CLEAN_COUNT=$(echo "$DEPENDABOT_PRS" | jq '[.[] | select(.mergeStateStatus != "clean")] | length')
CHANGES_REQUESTED_COUNT=$(echo "$DEPENDABOT_PRS" | jq '[.[] | select(.reviewDecision == "CHANGES_REQUESTED")] | length')
REVIEW_REQUIRED_COUNT=$(echo "$DEPENDABOT_PRS" | jq '[.[] | select(.reviewDecision == "REVIEW_REQUIRED")] | length')
READY_COUNT=$(echo "$DEPENDABOT_PRS" | jq '[.[] | select(.isDraft == false and .mergeable == true and .mergeStateStatus == "clean" and .reviewDecision != "CHANGES_REQUESTED" and .reviewDecision != "REVIEW_REQUIRED")] | length')

echo "Draft PRs: $DRAFT_COUNT"
echo "Not mergeable: $NOT_MERGEABLE_COUNT"
echo "Not clean (checks failing): $NOT_CLEAN_COUNT"
echo "Changes requested: $CHANGES_REQUESTED_COUNT"
echo "Review required: $REVIEW_REQUIRED_COUNT"
echo "Ready for auto-merge: $READY_COUNT"

echo ""
echo "=== Recommendations ==="
if [ "$DRAFT_COUNT" -gt 0 ]; then
    echo "- $DRAFT_COUNT PR(s) are in draft state. Convert them to ready for review."
fi
if [ "$NOT_CLEAN_COUNT" -gt 0 ]; then
    echo "- $NOT_CLEAN_COUNT PR(s) have failing checks. Fix the issues or wait for checks to pass."
fi
if [ "$CHANGES_REQUESTED_COUNT" -gt 0 ]; then
    echo "- $CHANGES_REQUESTED_COUNT PR(s) have changes requested. Approve them or dismiss the review."
fi
if [ "$REVIEW_REQUIRED_COUNT" -gt 0 ]; then
    echo "- $REVIEW_REQUIRED_COUNT PR(s) need review approval. Approve them."
fi
if [ "$READY_COUNT" -gt 0 ]; then
    echo "- $READY_COUNT PR(s) are ready for auto-merge. Run the automerge workflow!"
fi 