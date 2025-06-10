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
import { isCellType, isColumnType } from '../src/types/utils';

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

    describe('Basic Functionality', () => {
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
    });

    describe('Cell Types', () => {
        it('should handle all supported cell types', () => {
            const tableWithAllTypes: Table = {
                name: 'All Types',
                columns: [
                    {
                        headerText: 'String',
                        name: 'str',
                        type: { cellType: CellType.String, format: '@' },
                        width: 100,
                        isVisible: true,
                        style: new DefaultCellStyle(),
                    },
                    {
                        headerText: 'Number',
                        name: 'num',
                        type: { cellType: CellType.Number, format: '0' },
                        width: 100,
                        isVisible: true,
                        style: new DefaultCellStyle(),
                    },
                    {
                        headerText: 'Boolean',
                        name: 'bool',
                        type: { cellType: CellType.Boolean, format: 'BOOLEAN' },
                        width: 100,
                        isVisible: true,
                        style: new DefaultCellStyle(),
                    },
                    {
                        headerText: 'DateTime',
                        name: 'date',
                        type: { cellType: CellType.DateTime, format: 'yyyy-mm-dd' },
                        width: 100,
                        isVisible: true,
                        style: new DefaultCellStyle(),
                    },
                    {
                        headerText: 'Float',
                        name: 'float',
                        type: { cellType: CellType.Float, format: '0.00' },
                        width: 100,
                        isVisible: true,
                        style: new DefaultCellStyle(),
                    },
                    {
                        headerText: 'Percent',
                        name: 'percent',
                        type: { cellType: CellType.Percent, format: '0%' },
                        width: 100,
                        isVisible: true,
                        style: new DefaultCellStyle(),
                    },
                    {
                        headerText: 'Html',
                        name: 'html',
                        type: { cellType: CellType.Html, format: '@' },
                        width: 100,
                        isVisible: true,
                        style: new DefaultCellStyle(),
                    },
                    {
                        headerText: 'Large Number',
                        name: 'largeNum',
                        type: { cellType: CellType.LargeNumber, format: '@' },
                        width: 100,
                        isVisible: true,
                        style: new DefaultCellStyle(),
                    },
                ],
                rows: [
                    {
                        items: [
                            'text',
                            123,
                            true,
                            new Date(),
                            123.45,
                            0.75,
                            '<p>html</p>',
                            '010400592144000101',
                        ],
                    },
                ],
                headerStyle: new DefaultCellStyle(),
                defaultColumnWidth: null,
                defaultRowWidth: null,
            };

            const excelExport = new ExcelExport([tableWithAllTypes]);
            const result = excelExport.createExcel(false);
            expect(result).toBeDefined();
        });
    });

    describe('Table Properties', () => {
        it('should handle default column and row widths', () => {
            const tableWithDefaults: Table = {
                ...mockTable,
                defaultColumnWidth: 100,
                defaultRowWidth: 20,
            };

            const excelExport = new ExcelExport([tableWithDefaults]);
            const result = excelExport.createExcel(false);
            expect(result).toBeDefined();
        });

        it('should handle hidden columns', () => {
            const tableWithHiddenColumn: Table = {
                ...mockTable,
                columns: [
                    { ...mockTable.columns[0] },
                    { ...mockTable.columns[1], isVisible: false },
                ],
            };

            const excelExport = new ExcelExport([tableWithHiddenColumn]);
            const result = excelExport.createExcel(false);
            expect(result).toBeDefined();
        });

        it('should handle multiple worksheets', () => {
            const table2: Table = {
                ...mockTable,
                name: 'Sheet 2',
            };

            const excelExport = new ExcelExport([mockTable, table2]);
            const result = excelExport.createExcel(false);
            expect(result).toBeDefined();
        });
    });

    describe('Error Cases', () => {
        it('should handle empty table', () => {
            const emptyTable: Table = {
                name: 'Empty',
                columns: [],
                rows: [],
                headerStyle: new DefaultCellStyle(),
                defaultColumnWidth: null,
                defaultRowWidth: null,
            };

            const excelExport = new ExcelExport([emptyTable]);
            const result = excelExport.createExcel(false);
            expect(result).toBeDefined();
        });

        it('should handle table with no rows', () => {
            const tableWithNoRows: Table = {
                ...mockTable,
                rows: [],
            };

            const excelExport = new ExcelExport([tableWithNoRows]);
            const result = excelExport.createExcel(false);
            expect(result).toBeDefined();
        });
    });

    describe('Style Handling', () => {
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

        it('should handle merged cells', () => {
            const tableWithMergedCells: Table = {
                ...mockTable,
                columns: [
                    {
                        ...mockTable.columns[0],
                        style: {
                            ...mockTable.columns[0].style,
                            isMerged: true,
                            columnSpan: 2,
                        },
                    },
                    mockTable.columns[1],
                ],
            };

            const excelExport = new ExcelExport([tableWithMergedCells]);
            const result = excelExport.createExcel(false);
            expect(result).toBeDefined();
        });
    });
});

describe('Utility Functions', () => {
    it('should validate cell types', () => {
        expect(isCellType(CellType.String)).toBe(true);
        expect(isCellType(CellType.Number)).toBe(true);
        expect(isCellType(CellType.Boolean)).toBe(true);
        expect(isCellType(CellType.DateTime)).toBe(true);
        expect(isCellType(CellType.Float)).toBe(true);
        expect(isCellType(CellType.Percent)).toBe(true);
        expect(isCellType(CellType.Html)).toBe(true);
        expect(isCellType('Invalid')).toBe(false);
        expect(isCellType(null)).toBe(false);
        expect(isCellType(undefined)).toBe(false);
    });

    it('should validate column types', () => {
        const validColumnType = { cellType: CellType.String, format: '@' };
        const invalidColumnType = { cellType: 'Invalid', format: '@' };
        const missingFormat = { cellType: CellType.String };
        const missingCellType = { format: '@' };

        expect(isColumnType(validColumnType)).toBe(true);
        expect(isColumnType(invalidColumnType)).toBe(false);
        expect(isColumnType(missingFormat)).toBe(false);
        expect(isColumnType(missingCellType)).toBe(false);
        expect(isColumnType(null)).toBe(false);
        expect(isColumnType(undefined)).toBe(false);
    });
});
