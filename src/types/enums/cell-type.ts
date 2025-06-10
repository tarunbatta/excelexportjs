/**
 * Represents the data type of a cell in the Excel file.
 * Each type has specific formatting and behavior in Excel.
 */
export enum CellType {
    /** Boolean values (true/false) */
    Boolean = 'Boolean',
    /** Date and time values */
    DateTime = 'DateTime',
    /** Floating-point numbers with decimal places */
    Float = 'Float',
    /** HTML content that will be rendered in Excel */
    Html = 'Html',
    /** Integer or decimal numbers */
    Number = 'Number',
    /** Percentage values (0-100) */
    Percent = 'Percent',
    /** Plain text content */
    String = 'String',
    /** Large numbers that should be treated as text to prevent scientific notation */
    LargeNumber = 'LargeNumber',
}
