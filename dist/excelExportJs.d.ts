export declare namespace excelExportJs {
    enum eeCellTypes {
        Boolean = 0,
        DateTime = 1,
        Float = 2,
        Html = 3,
        Number = 4,
        Percent = 5,
        String = 6
    }
    enum eeHorizontalCellAlignment {
        Center = "Center",
        Left = "Left",
        Right = "Right"
    }
    enum eeVerticalCellAlignment {
        Bottom = "Bottom",
        Center = "Center",
        Top = "Top"
    }
    class eeAlignment {
        hAlign: eeHorizontalCellAlignment;
        vAlign: eeVerticalCellAlignment;
        isWrap: boolean;
        constructor(hAlign?: eeHorizontalCellAlignment, vAlign?: eeVerticalCellAlignment, isWrap?: boolean);
    }
    class eeBackground {
        color: string;
        pattern: string;
        constructor(color?: string, pattern?: string);
    }
    class eeFont {
        name: string;
        family: string;
        size: number;
        color: string;
        isBold: boolean;
        constructor(name?: string | null, family?: string | null, size?: number | null, color?: string | null, isBold?: boolean | null);
    }
    class eeCellStyle {
        styleId: string | null;
        background: eeBackground;
        alignment: eeAlignment;
        font: eeFont;
        isBordered: boolean;
        constructor(background?: eeBackground, alignment?: eeAlignment, font?: eeFont, isBordered?: boolean);
    }
    class eeColumnType {
        _celltype: eeCellTypes;
        cellType: string;
        format: string;
        constructor(_celltype?: eeCellTypes);
    }
    class eeCell {
        data: any;
        constructor(data: any);
    }
    class eeRow {
        items: Array<any>;
        constructor(data: Array<any>);
    }
    class eeColumn {
        headerText: string;
        type: eeColumnType;
        name: string;
        width: number;
        isVisible: boolean;
        style: eeCellStyle;
        constructor(name: string, headerText: string, type: eeColumnType, width?: number, isVisible?: boolean, style?: eeCellStyle);
    }
    class eeTable {
        columns: Array<eeColumn>;
        rows: Array<eeRow>;
        name: string;
        headerStyle: eeCellStyle;
        defaultColumnWidth: number | null;
        defaultRowWidth: number | null;
        constructor(name: string, columns: Array<eeColumn>, rows: Array<eeRow>, headerStyle?: eeCellStyle, defaultColumnWidth?: number, defaultRowWidth?: number);
    }
    class eeHelper {
        static RemoveSpaces(html: string): string;
        static htmlEncode(html: string): string;
    }
    class excelExport {
        private _dataType;
        private _fileExtension;
        private _encoding;
        dataSet: Array<eeTable>;
        fileName: string;
        author: string;
        company: string;
        version: string;
        style: eeCellStyle;
        constructor(dataSet: Array<eeTable>, fileName?: string, author?: string, company?: string, version?: string, style?: eeCellStyle);
        private _GetFileName;
        private _GetDocumentProperties;
        private _GetOfficeDocumentSettings;
        private _GetExcelWorkbook;
        private _GetBorders;
        private _GetAlignment;
        private _GetBackground;
        private _GetFont;
        private _GetNumberFormat;
        private _GetStyles;
        private _GetWorkSheets;
        private _GetWorksheetOptions;
        CreateExcel(isCompressed?: boolean, returnUrl?: boolean): string;
    }
}
