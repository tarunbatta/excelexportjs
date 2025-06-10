import { HorizontalAlignment, VerticalAlignment } from '../enums/alignment';

/**
 * Defines how content is aligned within a cell.
 * Controls both horizontal and vertical positioning, as well as text wrapping.
 */
export interface Alignment {
    /** Horizontal alignment of the cell content */
    hAlign: HorizontalAlignment;
    /** Vertical alignment of the cell content */
    vAlign: VerticalAlignment;
    /** Whether text should wrap within the cell */
    isWrap: boolean;
}

/**
 * Defines the background appearance of a cell.
 * Controls the color and pattern of the cell's background.
 */
export interface Background {
    /** Background color in hex format (e.g., '#FF0000') */
    color: string;
    /** Background pattern (e.g., 'Solid', 'Gray50', etc.) */
    pattern: string;
}

/**
 * Defines the text appearance within a cell.
 * Controls font family, size, color, and weight.
 */
export interface Font {
    /** Name of the font (e.g., 'Arial', 'Calibri') */
    name: string;
    /** Font family category (e.g., 'Swiss', 'Roman') */
    family: string;
    /** Font size in points */
    size: number;
    /** Font color in hex format (e.g., '#000000') */
    color: string;
    /** Whether the text should be bold */
    isBold: boolean;
}

/**
 * Defines the complete style of a cell.
 * Combines alignment, background, font, and border settings.
 */
export interface CellStyle {
    /** Font family for the cell text */
    fontFamily: string;
    /** Font size in points */
    fontSize: number;
    /** Font color in hex format (e.g., '#FF0000' for red) */
    fontColor: string;
    /** Whether the text should be bold */
    isBold: boolean;
    /** Whether the text should be italic */
    isItalic: boolean;
    /** Whether the text should be underlined */
    isUnderline: boolean;
    /** Background color of the cell in hex format */
    backgroundColor: string;
    /** Horizontal alignment of the cell content */
    horizontalAlignment: HorizontalAlignment;
    /** Vertical alignment of the cell content */
    verticalAlignment: VerticalAlignment;
    /** Whether to wrap text within the cell */
    isWrapped: boolean;
    /** Whether to merge this cell with adjacent cells */
    isMerged: boolean;
    /** Number of rows to merge (if isMerged is true) */
    rowSpan: number;
    /** Number of columns to merge (if isMerged is true) */
    columnSpan: number;
}
