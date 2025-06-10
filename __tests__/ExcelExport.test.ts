import { ExcelExport, Table, CellType, CellStyle, HorizontalAlignment, VerticalAlignment, DefaultCellStyle } from '../index';

describe('ExcelExport', () => {
    const mockTable: Table = {
        name: 'Test Sheet',
        columns: [
            {
                name: 'name',
                headerText: 'Name',
                type: {
                    cellType: CellType.String,
                    format: '@'
                },
                width: 100,
                isVisible: true,
                style: new DefaultCellStyle()
            },
            {
                name: 'age',
                headerText: 'Age',
                type: {
                    cellType: CellType.Number,
                    format: '0'
                },
                width: 50,
                isVisible: true,
                style: new DefaultCellStyle()
            }
        ],
        rows: [
            {
                items: [
                    { name: 'John Doe', age: 30 },
                    { name: 'Jane Smith', age: 25 }
                ]
            }
        ],
        headerStyle: new DefaultCellStyle(),
        defaultColumnWidth: null,
        defaultRowWidth: null
    };

    it('should create an Excel file with the correct data', () => {
        const excelExport = new ExcelExport([mockTable], 'test');
        const result = excelExport.createExcel(true, true);
        
        expect(result).toBeDefined();
        expect(typeof result).toBe('string');
        expect(result).toContain('test.xlsx');
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
            styleId: null,
            background: {
                color: '#FF0000',
                pattern: 'Solid'
            },
            alignment: {
                hAlign: HorizontalAlignment.Center,
                vAlign: VerticalAlignment.Center,
                isWrap: true
            },
            font: {
                name: 'Arial',
                family: 'Swiss',
                size: 12,
                color: '#000000',
                isBold: true
            },
            isBordered: true
        };

        const excelExport = new ExcelExport([mockTable], 'test', 'Custom Author', 'Custom Company', '2.0.0', customStyle);
        
        expect(excelExport.style).toEqual(customStyle);
    });
}); 