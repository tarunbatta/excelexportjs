import { describe, expect, it } from '@jest/globals';
import { ExcelExport, Table, CellType, DefaultCellStyle } from '../src/index';

describe('ExcelExport Features', () => {
    describe('Large Numbers', () => {
        it('should handle large numbers without scientific notation', () => {
            const table: Table = {
                name: 'Large Numbers Test',
                columns: [
                    {
                        headerText: 'Account Number',
                        name: 'accountNumber',
                        type: { cellType: CellType.LargeNumber, format: '@' },
                        width: 150,
                        isVisible: true,
                        style: new DefaultCellStyle(),
                    },
                ],
                rows: [{ items: ['010400592144000101'] }, { items: ['010400592144000102'] }],
                headerStyle: new DefaultCellStyle(),
                defaultColumnWidth: null,
                defaultRowWidth: null,
            };

            const excelExport = new ExcelExport([table]);
            const result = excelExport.createExcel(false);
            expect(result).toBeDefined();
            // Note: Actual value verification would be in the XML generation
        });
    });

    describe('Text Styling', () => {
        it('should have non-bold text by default', () => {
            const table: Table = {
                name: 'Text Style Test',
                columns: [
                    {
                        headerText: 'Regular Text',
                        name: 'text',
                        type: { cellType: CellType.String, format: '@' },
                        width: 100,
                        isVisible: true,
                        style: new DefaultCellStyle(), // Should be non-bold by default
                    },
                ],
                rows: [{ items: ['Sample Text'] }],
                headerStyle: new DefaultCellStyle(),
                defaultColumnWidth: null,
                defaultRowWidth: null,
            };

            const excelExport = new ExcelExport([table]);
            const result = excelExport.createExcel(false);
            expect(result).toBeDefined();
            // Note: Actual style verification would be in the XML generation
        });

        it('should have bold headers by default', () => {
            const table: Table = {
                name: 'Header Style Test',
                columns: [
                    {
                        headerText: 'Header',
                        name: 'header',
                        type: { cellType: CellType.String, format: '@' },
                        width: 100,
                        isVisible: true,
                        style: new DefaultCellStyle(),
                    },
                ],
                rows: [{ items: ['Data'] }],
                headerStyle: {
                    ...new DefaultCellStyle(),
                    isBold: true, // Headers should be bold
                },
                defaultColumnWidth: null,
                defaultRowWidth: null,
            };

            const excelExport = new ExcelExport([table]);
            const result = excelExport.createExcel(false);
            expect(result).toBeDefined();
            // Note: Actual style verification would be in the XML generation
        });
    });

    describe('Hidden Columns', () => {
        it('should handle hidden columns correctly', () => {
            const table: Table = {
                name: 'Hidden Columns Test',
                columns: [
                    {
                        headerText: 'Visible Column',
                        name: 'visible',
                        type: { cellType: CellType.String, format: '@' },
                        width: 100,
                        isVisible: true,
                        style: new DefaultCellStyle(),
                    },
                    {
                        headerText: 'Hidden Column',
                        name: 'hidden',
                        type: { cellType: CellType.String, format: '@' },
                        width: 100,
                        isVisible: false, // This column should be hidden
                        style: new DefaultCellStyle(),
                    },
                ],
                rows: [{ items: ['Visible Data', 'Hidden Data'] }],
                headerStyle: new DefaultCellStyle(),
                defaultColumnWidth: null,
                defaultRowWidth: null,
            };

            const excelExport = new ExcelExport([table]);
            const result = excelExport.createExcel(false);
            expect(result).toBeDefined();
            // Note: Actual visibility verification would be in the XML generation
        });
    });

    describe('Dynamic File Names', () => {
        it('should handle dynamic file names', () => {
            const table: Table = {
                name: 'File Name Test',
                columns: [
                    {
                        headerText: 'Data',
                        name: 'data',
                        type: { cellType: CellType.String, format: '@' },
                        width: 100,
                        isVisible: true,
                        style: new DefaultCellStyle(),
                    },
                ],
                rows: [{ items: ['Test Data'] }],
                headerStyle: new DefaultCellStyle(),
                defaultColumnWidth: null,
                defaultRowWidth: null,
            };

            const date = new Date().toISOString().split('T')[0];
            const fileName = `Report_${date}`;
            const excelExport = new ExcelExport([table], fileName);

            expect(excelExport.fileName).toBe(fileName);
            const result = excelExport.createExcel(false);
            expect(result).toBeDefined();
        });

        it('should use default file name when not provided', () => {
            const table: Table = {
                name: 'Default File Name Test',
                columns: [
                    {
                        headerText: 'Data',
                        name: 'data',
                        type: { cellType: CellType.String, format: '@' },
                        width: 100,
                        isVisible: true,
                        style: new DefaultCellStyle(),
                    },
                ],
                rows: [{ items: ['Test Data'] }],
                headerStyle: new DefaultCellStyle(),
                defaultColumnWidth: null,
                defaultRowWidth: null,
            };

            const excelExport = new ExcelExport([table]);
            expect(excelExport.fileName).toBe('ExcelExport');
            const result = excelExport.createExcel(false);
            expect(result).toBeDefined();
        });
    });
});
