# ExcelExportJS

A lightweight JavaScript library for exporting data to Excel files directly in the browser. No server-side processing required.

## Features

- 🚀 Browser-based Excel file generation
- 📊 Support for multiple worksheets
- 🎨 Customizable cell styles (fonts, colors, alignment)
- 📝 Multiple data types (text, numbers, dates)
- 🔄 Automatic column width adjustment
- 🎯 TypeScript support
- 📝 Dynamic file naming support
- 🔢 Support for large numbers without scientific notation
- 👁️ Column visibility control
- 📋 Default non-bold text styling

## Installation

```bash
npm install excelexportjs
```

## Quick Start

```typescript
import { ExcelExport, Table, CellType, HorizontalAlignment, VerticalAlignment } from 'excelexportjs';

// Create a table definition
const table: Table = {
    name: 'Sales Report',
    columns: [
        {
            headerText: 'Account Number',
            name: 'accountNumber',
            // Use LargeNumber type to prevent scientific notation for large numbers
            type: { cellType: CellType.LargeNumber, format: '@' },
            width: 150,
            isVisible: true,
            style: {
                fontFamily: 'Arial',
                fontSize: 12,
                fontColor: '#000000',
                isBold: false,  // Text is not bold by default
                isItalic: false,
                isUnderline: false,
                backgroundColor: '#FFFFFF',
                horizontalAlignment: HorizontalAlignment.Left,
                verticalAlignment: VerticalAlignment.Center,
                isWrapped: false,
                isMerged: false,
                rowSpan: 1,
                columnSpan: 1
            }
        },
        {
            headerText: 'Sales',
            name: 'sales',
            type: { cellType: CellType.Number, format: '$#,##0.00' },
            width: 100,
            isVisible: true,
            style: {
                fontFamily: 'Arial',
                fontSize: 12,
                fontColor: '#000000',
                isBold: false,
                isItalic: false,
                isUnderline: false,
                backgroundColor: '#FFFFFF',
                horizontalAlignment: HorizontalAlignment.Right,
                verticalAlignment: VerticalAlignment.Center,
                isWrapped: false,
                isMerged: false,
                rowSpan: 1,
                columnSpan: 1
            }
        },
        {
            headerText: 'Hidden Column',
            name: 'hidden',
            type: { cellType: CellType.String, format: '@' },
            width: 100,
            isVisible: false,  // This column will be hidden in Excel
            style: new DefaultCellStyle()
        }
    ],
    rows: [
        { items: ['010400592144000101', 1500.50, 'hidden data'] },
        { items: ['010400592144000102', 2750.75, 'hidden data'] }
    ],
    headerStyle: {
        fontFamily: 'Arial',
        fontSize: 12,
        fontColor: '#000000',
        isBold: true,  // Only headers are bold by default
        isItalic: false,
        isUnderline: false,
        backgroundColor: '#FFFFFF',
        horizontalAlignment: HorizontalAlignment.Center,
        verticalAlignment: VerticalAlignment.Center,
        isWrapped: false,
        isMerged: false,
        rowSpan: 1,
        columnSpan: 1
    },
    defaultColumnWidth: null,
    defaultRowWidth: null
};

// Create and export Excel file with dynamic name
const date = new Date().toISOString().split('T')[0];
const excelExport = new ExcelExport([table], `SalesReport_${date}`);
excelExport.createExcel();
```

## API Reference

### ExcelExport

Main class for creating Excel exports.

```typescript
new ExcelExport(
    dataSet: Table[],
    fileName?: string,  // Custom name for the Excel file (default: 'ExcelExport')
    author?: string,
    company?: string,
    version?: string,
    style?: CellStyle
)
```

#### Parameters:
- `dataSet`: Array of tables to export
- `fileName`: Name of the Excel file (default: 'ExcelExport')
- `author`: Author name (default: 'ExcelExportJS')
- `company`: Company name (default: 'ExcelExportJS')
- `version`: Version number (default: '1.0.0')
- `style`: Default cell style (default: new DefaultCellStyle())

#### Methods:
- `createExcel(returnUrl: boolean = false): string | Blob`
  - Creates and downloads the Excel file
  - If `returnUrl` is true, returns a blob URL instead of downloading

### Table

Represents a worksheet in the Excel file.

```typescript
interface Table {
    name: string;
    columns: Column[];
    rows: Row[];
    headerStyle: CellStyle;
    defaultColumnWidth: number | null;
    defaultRowWidth: number | null;
}
```

### Column

Defines a column in the Excel file.

```typescript
interface Column {
    headerText: string;
    name: string;
    type: ColumnType;
    width: number;
    isVisible: boolean;  // Controls column visibility in Excel
    style: CellStyle;
}
```

### CellStyle

Defines the style properties for cells.

```typescript
interface CellStyle {
    fontFamily: string;
    fontSize: number;
    fontColor: string;
    isBold: boolean;  // Controls text boldness
    isItalic: boolean;
    isUnderline: boolean;
    backgroundColor: string;
    horizontalAlignment: HorizontalAlignment;
    verticalAlignment: VerticalAlignment;
    isWrapped: boolean;
    isMerged: boolean;
    rowSpan: number;
    columnSpan: number;
}
```

## Supported Cell Types

- `CellType.String`: Text data
- `CellType.Number`: Numeric data
- `CellType.Date`: Date/time data
- `CellType.Boolean`: Boolean values
- `CellType.LargeNumber`: Large numbers that should be treated as text to prevent scientific notation (e.g., account numbers, IDs)
- `CellType.Float`: Floating-point numbers
- `CellType.Percent`: Percentage values
- `CellType.Html`: HTML content

## Best Practices

1. **Large Numbers**: Use `CellType.LargeNumber` for any numeric values that should not be displayed in scientific notation (e.g., account numbers, IDs, etc.)
   ```typescript
   type: { cellType: CellType.LargeNumber, format: '@' }
   ```

2. **Hidden Columns**: Set `isVisible: false` for any columns that should not appear in the Excel file
   ```typescript
   isVisible: false
   ```

3. **Text Styling**: By default, text is not bold. Only headers are bold by default. Override `isBold` in the style if needed
   ```typescript
   style: {
       ...new DefaultCellStyle(),
       isBold: false  // Explicitly set to false for non-bold text
   }
   ```

4. **Dynamic File Names**: Use the `fileName` parameter to create dynamic file names
   ```typescript
   const date = new Date().toISOString().split('T')[0];
   new ExcelExport([table], `Report_${date}`);
   ```

## Alignment Options

### HorizontalAlignment
- `Left`
- `Center`
- `Right`

### VerticalAlignment
- `Top`
- `Center`
- `Bottom`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © [BattaTech](https://battatech.com/)

## Support

If you find this package helpful, please consider giving it a ⭐️ on GitHub!