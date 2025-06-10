# ExcelExportJS

A lightweight JavaScript library for exporting data to Excel files directly in the browser. No server-side processing required.

## Features

- 🚀 Browser-based Excel file generation
- 📊 Support for multiple worksheets
- 🎨 Customizable cell styles (fonts, colors, alignment)
- 📝 Multiple data types (text, numbers, dates)
- 🔄 Automatic column width adjustment
- 🎯 TypeScript support

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
            headerText: 'Product',
            name: 'product',
            type: { cellType: CellType.String, format: '@' },
            width: 150,
            isVisible: true,
            style: {
                fontFamily: 'Arial',
                fontSize: 12,
                fontColor: '#000000',
                isBold: true,
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
        }
    ],
    rows: [
        { items: ['Product A', 1500.50] },
        { items: ['Product B', 2750.75] }
    ],
    headerStyle: {
        fontFamily: 'Arial',
        fontSize: 12,
        fontColor: '#000000',
        isBold: true,
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

// Create and export Excel file
const excelExport = new ExcelExport([table], 'SalesReport');
excelExport.createExcel();
```

## API Reference

### ExcelExport

Main class for creating Excel exports.

```typescript
new ExcelExport(
    dataSet: Table[],
    fileName?: string,
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
    isVisible: boolean;
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
    isBold: boolean;
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

MIT © [Tarun Batta](https://www.linkedin.com/in/tarunbatta/)

## Support

If you find this package helpful, please consider giving it a ⭐️ on GitHub!