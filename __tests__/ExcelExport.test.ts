import { describe, expect, it } from '@jest/globals';
import {
    ExcelExport,
    Table,
    CellType,
    CellStyle,
    HorizontalAlignment,
    VerticalAlignment,
    DefaultCellStyle,
} from '../src/index';

describe('ExcelExport', () => {
    const mockTable: Table = {
        name: 'Test Sheet',
        columns: [
            {
                headerText: 'Name',
                name: 'name',
                type: { cellType: CellType.String, format: '@' },
                width: 100,
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
                    columnSpan: 1,
                },
            },
            {
                headerText: 'Age',
                name: 'age',
                type: { cellType: CellType.Number, format: '0' },
                width: 50,
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
                    columnSpan: 1,
                },
            },
        ],
        rows: [{ items: ['John Doe', 30] }, { items: ['Jane Smith', 25] }],
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
            columnSpan: 1,
        },
        defaultColumnWidth: null,
        defaultRowWidth: null,
    };

    it('should create an Excel file', () => {
        const excelExport = new ExcelExport([mockTable], 'TestExport');
        const result = excelExport.createExcel(true);

        expect(result).toBeDefined();
        expect(typeof result).toBe('string');
        expect(result).toBe('blob:mock-url');
    });

    it('should create a Blob when returnUrl is false', () => {
        const excelExport = new ExcelExport([mockTable], 'TestExport');
        const result = excelExport.createExcel(false);

        expect(result).toBeDefined();
        expect(result instanceof Blob).toBe(true);
        if (result instanceof Blob) {
            expect(result.type).toBe(
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            );
        }
    });

    it('should use default values when not provided', () => {
        const excelExport = new ExcelExport([mockTable]);

        expect(excelExport.fileName).toBe('ExcelExport');
        expect(excelExport.author).toBe('ExcelExportJS');
        expect(excelExport.company).toBe('ExcelExportJS');
        expect(excelExport.version).toBe('1.0.0');
    });

    it('should handle custom styles', () => {
        const customStyle: CellStyle = {
            fontFamily: 'Arial',
            fontSize: 12,
            fontColor: '#000000',
            isBold: true,
            isItalic: false,
            isUnderline: false,
            backgroundColor: '#FF0000',
            horizontalAlignment: HorizontalAlignment.Center,
            verticalAlignment: VerticalAlignment.Center,
            isWrapped: true,
            isMerged: false,
            rowSpan: 1,
            columnSpan: 1,
        };

        const excelExport = new ExcelExport(
            [mockTable],
            'test',
            'Custom Author',
            'Custom Company',
            '2.0.0',
            customStyle
        );

        expect(excelExport.style).toEqual(customStyle);
    });
});
