import { Table } from './types/interfaces/data';
import { CellStyle } from './types/interfaces/styles';
import { DefaultCellStyle } from './styles/DefaultCellStyle';

export * from './types/interfaces/data';
export * from './types/interfaces/styles';
export * from './types/enums/cell-type';
export * from './types/enums/alignment';
export { DefaultCellStyle } from './styles/DefaultCellStyle';

export class ExcelExport {
    private readonly dataType: string =
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    private readonly fileExtension: string = '.xlsx';

    constructor(
        public readonly dataSet: Table[],
        public readonly fileName: string = 'ExcelExport',
        public readonly author: string = 'ExcelExportJS',
        public readonly company: string = 'ExcelExportJS',
        public readonly version: string = '1.0.0',
        public readonly style: CellStyle = new DefaultCellStyle()
    ) {}

    public createExcel(returnUrl: boolean = false): string | Blob {
        const xml = this.generateExcelXml();
        const blob = new Blob([xml], { type: this.dataType });

        if (returnUrl) {
            return URL.createObjectURL(blob);
        }

        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${this.fileName}${this.fileExtension}`;
        link.click();
        URL.revokeObjectURL(link.href);

        return blob;
    }

    private generateExcelXml(): string {
        // Implementation of XML generation
        // This is a placeholder - the actual implementation would be quite long
        return '';
    }
}
