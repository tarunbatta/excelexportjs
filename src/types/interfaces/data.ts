import { CellType } from '../enums/cell-type';
import { CellStyle } from './styles';

/**
 * Defines the type and format of data in a column.
 * Controls how data is interpreted and displayed in Excel.
 */
export interface ColumnType {
    /** The data type of the column */
    cellType: CellType;
    /** Excel format string for the column (e.g., '@' for text, '0' for numbers) */
    format: string;
}

/**
 * Represents a single cell of data in the Excel file.
 * The data can be of any type, which will be formatted according to the column type.
 */
export interface Cell {
    /** The cell's data value */
    data: unknown;
}

/**
 * Represents a row of data in the Excel file.
 * Contains an array of items that will be mapped to cells.
 */
export interface Row {
    /** Array of data items that will be mapped to cells */
    items: unknown[];
}

/**
 * Defines a column in the Excel file.
 * Specifies how data in the column should be displayed and formatted.
 */
export interface Column {
    /** Text to display in the column header */
    headerText: string;
    /** Type and format settings for the column */
    type: ColumnType;
    /** Unique identifier for the column */
    name: string;
    /** Width of the column in pixels */
    width: number;
    /** Whether the column should be visible */
    isVisible: boolean;
    /** Style settings for the column */
    style: CellStyle;
}

/**
 * Represents a worksheet in the Excel file.
 * Contains columns, rows, and styling information.
 */
export interface Table {
    /** Array of column definitions */
    columns: Column[];
    /** Array of data rows */
    rows: Row[];
    /** Name of the worksheet */
    name: string;
    /** Style settings for the header row */
    headerStyle: CellStyle;
    /** Default width for all columns (optional) */
    defaultColumnWidth: number | null;
    /** Default height for all rows (optional) */
    defaultRowWidth: number | null;
}
