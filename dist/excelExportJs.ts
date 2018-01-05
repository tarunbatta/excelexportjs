export namespace excelExportJs {
    'use strict';

    export enum eeCellTypes {
        Boolean,
        DateTime,
        Float,
        Html,
        Number,
        Percent,
        String
    }

    export enum eeHorizontalCellAlignment {
        Center = 'Center',
        Left = 'Left',
        Right = 'Right'
    }

    export enum eeVerticalCellAlignment {
        Bottom = 'Bottom',
        Center = 'Center',
        Top = 'Top'
    }

    export class eeAlignment {
        public hAlign: eeHorizontalCellAlignment;
        public vAlign: eeVerticalCellAlignment;
        public isWrap: boolean;

        /** Contructor to create object of eeAlignment */
        constructor(hAlign?: eeHorizontalCellAlignment, vAlign?: eeVerticalCellAlignment, isWrap?: boolean) {
            if (hAlign) {
                this.hAlign = hAlign;
            }
            else {
                this.hAlign = eeHorizontalCellAlignment.Left;
            }

            if (vAlign) {
                this.vAlign = vAlign;
            }
            else {
                this.vAlign = eeVerticalCellAlignment.Center;
            }

            if (isWrap) {
                this.isWrap = isWrap;
            }
            else {
                this.isWrap = false;
            }
        }
    }

    export class eeBackground {
        public color: string;
        public pattern: string;

        /** Contructor to create object of eeBackground */
        constructor(color?: string, pattern?: string) {
            if (color) {
                this.color = color;
            }
            else {
                this.color = '#FFFFFF';
            }

            if (pattern) {
                this.pattern = pattern;
            }
            else {
                this.pattern = 'Solid';
            }
        }
    }

    export class eeFont {
        public name: string;
        public family: string;
        public size: number;
        public color: string;
        public isBold: boolean;

        /** Contructor to create object of eeCellStyle */
        constructor(name?: string | null, family?: string | null, size?: number | null, color?: string | null, isBold?: boolean | null) {
            if (name) {
                this.name = name;
            }
            else {
                this.name = 'Calibri';
            }

            if (family) {
                this.family = family;
            }
            else {
                this.family = 'Swiss';
            }

            if (size) {
                this.size = size;
            }
            else {
                this.size = 10;
            }

            if (color) {
                this.color = color;
            }
            else {
                this.color = '#000000';
            }

            if (isBold) {
                this.isBold = isBold;
            }
            else {
                this.isBold = false;
            }
        }
    }

    export class eeCellStyle {
        public styleId: string | null;
        public background: eeBackground;
        public alignment: eeAlignment;
        public font: eeFont;
        public isBordered: boolean;

        /** Contructor to create object of eeCellStyle */
        constructor(background?: eeBackground, alignment?: eeAlignment, font?: eeFont, isBordered?: boolean) {
            this.styleId = null;

            if (background) {
                this.background = background;
            }
            else {
                this.background = new eeBackground();
            }

            if (alignment) {
                this.alignment = alignment;
            }
            else {
                this.alignment = new eeAlignment();
            }

            if (font) {
                this.font = font;
            }
            else {
                this.font = new eeFont();
            }

            if (isBordered) {
                this.isBordered = isBordered;
            }
            else {
                this.isBordered = false;
            }
        }
    }

    export class eeColumnType {
        public _celltype: eeCellTypes = eeCellTypes.String;
        public cellType: string = 'String';
        public format: string = '@';

        /** Contructor to create object of eeColumnType */
        constructor(_celltype?: eeCellTypes) {
            if (_celltype) {
                this._celltype = _celltype;

                switch (<eeCellTypes>_celltype) {
                    case eeCellTypes.Boolean:
                        this.cellType = 'Boolean';
                        this.format = '';
                        break;
                    case eeCellTypes.DateTime:
                        this.cellType = 'DateTime';
                        this.format = '[ENG][$-409]d\-mmm\-yyyy;@';
                        break;
                    case eeCellTypes.Float:
                        this.cellType = 'Number';
                        this.format = 'Fixed';
                        break;
                    case eeCellTypes.Html:
                        this.cellType = 'String';
                        this.format = '@';
                        break;
                    case eeCellTypes.Number:
                        this.cellType = 'Number';
                        this.format = '0';
                        break;
                    case eeCellTypes.Percent:
                        this.cellType = 'Number';
                        this.format = 'Percent';
                        break;
                    default:
                        this.cellType = 'String';
                        this.format = '@';
                }
            }
        }
    }

    export class eeCell {
        public data: any;

        /** Contructor to create object of eeCell */
        constructor(data: any) {
            this.data = data;
        }
    }

    export class eeRow {
        public items: Array<any>;

        /** Contructor to create object of eeRow */
        constructor(data: Array<any>) {
            this.items = data;
        }
    }

    export class eeColumn {
        public headerText: string;
        public type: eeColumnType;
        public name: string;
        public width: number;
        public isVisible: boolean;
        public style: eeCellStyle;

        /** Contructor to create object of eeColumn */
        constructor(name: string, headerText: string, type: eeColumnType, width?: number, isVisible?: boolean, style?: eeCellStyle) {
            this.name = name;
            this.headerText = headerText;
            this.type = type;

            if (width) {
                this.width = width;
            }
            else {
                this.width = 100;
            }

            if (isVisible) {
                this.isVisible = isVisible;
            }
            else {
                this.isVisible = true;
            }

            if (style) {
                this.style = style;
            }
            else {
                this.style = new eeCellStyle(new eeBackground(), new eeAlignment(eeHorizontalCellAlignment.Left, eeVerticalCellAlignment.Center), new eeFont(), true);
            }
        }
    }

    export class eeTable {
        public columns: Array<eeColumn>;
        public rows: Array<eeRow>;
        public name: string;
        public headerStyle: eeCellStyle;
        public defaultColumnWidth: number | null;
        public defaultRowWidth: number | null;

        /** Contructor to create object of eeTable */
        constructor(name: string, columns: Array<eeColumn>, rows: Array<eeRow>, headerStyle?: eeCellStyle, defaultColumnWidth?: number, defaultRowWidth?: number) {
            this.name = name;
            this.columns = columns;
            this.rows = rows;

            if (headerStyle) {
                this.headerStyle = headerStyle;
            }
            else {
                this.headerStyle = new eeCellStyle(new eeBackground('#FFC000'), new eeAlignment(eeHorizontalCellAlignment.Center, eeVerticalCellAlignment.Center), new eeFont(null, null, 11, null, true), true);
            }

            if (defaultColumnWidth) {
                this.defaultColumnWidth = defaultColumnWidth;
            }
            else {
                this.defaultColumnWidth = null;
            }

            if (defaultRowWidth) {
                this.defaultRowWidth = defaultRowWidth;
            }
            else {
                this.defaultRowWidth = null;
            }
        }
    }

    export class eeHelper {
        static RemoveSpaces(html: string) {
            let lines = html.split(/(?:\r\n|\n|\r)/);

            // Rip out the leading whitespace.
            return lines.map((line) => {
                return line.replace(/^\s+/gm, '');
            }).join(' ').trim();
        }

        static htmlEncode(html: string) {
            return String(html).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
        }
    }

    export class excelExport {
        private _dataType: string;
        private _fileExtension: string;
        private _encoding: string;

        public dataSet: Array<eeTable>;
        public fileName: string;
        public author: string;
        public company: string;
        public version: string;
        public style: eeCellStyle;

        /** Contructor to create object of excelExportJs */
        constructor(dataSet: Array<eeTable>, fileName?: string, author?: string, company?: string, version?: string, style?: eeCellStyle) {
            this._dataType = 'json';
            this._fileExtension = 'xml';
            this._encoding = 'UTF-8';

            this.dataSet = dataSet;

            if (fileName) {
                this.fileName = fileName;
            }
            else {
                this.fileName = 'download';
            }

            if (author) {
                this.author = author;
            }
            else {
                this.author = 'Tarun Batta';
            }

            if (company) {
                this.company = company;
            }
            else {
                this.company = 'BattaTech Private Ltd.';
            }

            if (version) {
                this.version = version;
            }
            else {
                this.version = '1.0';
            }

            if (style) {
                this.style = style;
            }
            else {
                this.style = new eeCellStyle(new eeBackground(), new eeAlignment(eeHorizontalCellAlignment.Left, eeVerticalCellAlignment.Center), new eeFont());
            }
        }

        private _GetFileName() {
            return this.fileName + '.' + this._fileExtension;
        }

        private _GetDocumentProperties() {
            return `<DocumentProperties xmlns="urn:schemas-microsoft-com:office:office">
                        <Author>` + this.author + `</Author>
                        <Created>`+ new Date().toISOString() + `</Created>
                        <Company>` + this.company + `</Company>
                        <Version>` + this.version + `</Version>
                    </DocumentProperties>`;
        }

        private _GetOfficeDocumentSettings() {
            return `<OfficeDocumentSettings xmlns="urn:schemas-microsoft-com:office:office">
                        <AllowPNG/>
                    </OfficeDocumentSettings>`;
        }

        private _GetExcelWorkbook() {
            return `<ExcelWorkbook xmlns="urn:schemas-microsoft-com:office:excel">
                        <WindowHeight>8958</WindowHeight>
                        <WindowWidth>11358</WindowWidth>
                        <WindowTopX>480</WindowTopX>
                        <WindowTopY>18</WindowTopY>
                        <ProtectStructure>False</ProtectStructure>
                        <ProtectWindows>False</ProtectWindows>
                    </ExcelWorkbook>`;
        }

        private _GetBorders(style: eeCellStyle) {
            var result = '';

            if (style && style.isBordered) {
                result = `<Borders>
                            <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/>
                            <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>
                            <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1"/>
                            <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/>
                        </Borders>`;
            }
            else {
                result = '<Borders/>';
            }

            return result;
        }

        private _GetAlignment(style: eeCellStyle) {
            var result = '';

            if (style) {
                let wrap = style.alignment.isWrap ? 1 : 0;
                result = '<Alignment ss:Horizontal="' + style.alignment.hAlign + '" ss:Vertical="' + style.alignment.vAlign + '" ss:WrapText="' + wrap + '"/>';
            }
            else {
                result = '<Alignment/>';
            }

            return result;
        }

        private _GetBackground(style: eeCellStyle) {
            var result = '';

            if (style) {
                result = '<Interior ss:Color="' + style.background.color + '" ss:Pattern="' + style.background.pattern + '"/>';
            }
            else {
                result = '<Interior/>';
            }

            return result;
        }

        private _GetFont(style: eeCellStyle) {
            var result = '';

            if (style) {
                var bold = style.font.isBold ? 1 : 0;
                result = '<Font ss:FontName="' + style.font.name + '" x:Family="' + style.font.family + '" ss:Size="' + style.font.size + '" ss:Color="' + style.font.color + '" ss:Bold="' + bold + '"/>';
            }
            else {
                result = '<Font/>';
            }

            return result;
        }

        private _GetNumberFormat(column: eeColumn | null) {
            var result = '';

            if (column) {
                switch (column.type._celltype) {
                    case eeCellTypes.Boolean:
                        result = '<NumberFormat/>';
                        break;
                    default:
                        result = `<NumberFormat ss:Format="` + column.type.format + `"/>`;
                }
            }
            else {
                result = '<NumberFormat/>';
            }

            return result;
        }

        private _GetStyles() {
            var result = '<Styles>';

            result += `<Style ss:ID="Default" ss:Name="Normal">
                            `+ this._GetAlignment(this.style) + `
                            `+ this._GetBorders(this.style) + `
                            `+ this._GetFont(this.style) + `
                            `+ this._GetBackground(this.style) + `
                            `+ this._GetNumberFormat(null) + `
                            <Protection/>
                        </Style>`;

            this.dataSet.forEach((item, itable) => {
                let hstyleId = 'w' + itable + 'h';
                result += `<Style ss:ID="` + hstyleId + `" >
                                `+ this._GetAlignment(item.headerStyle) + `
                            </Style>`;

                item.columns.forEach((column, icolumn) => {
                    let hcstyleId = 'w' + itable + 'hc' + icolumn;
                    result += `<Style ss:ID="` + hcstyleId + `" >
                                    `+ this._GetAlignment(item.headerStyle) + `
                                    `+ this._GetBorders(item.headerStyle) + `
                                    `+ this._GetFont(item.headerStyle) + `
                                    `+ this._GetBackground(item.headerStyle) + `
                                    `+ this._GetNumberFormat(column) + `
                                </Style>`;

                    let cstyleId = 'w' + itable + 'c' + icolumn;
                    result += `<Style ss:ID="` + cstyleId + `" >
                                    `+ this._GetAlignment(column.style) + `
                                    `+ this._GetBorders(column.style) + `
                                    `+ this._GetFont(column.style) + `
                                    `+ this._GetNumberFormat(column) + `
                                </Style>`;
                });

                item.rows.forEach((row, irow) => {
                    if (row) {
                        row.items.forEach((rowItem, irowItem) => {
                            Object.keys(rowItem).forEach((key, ikey) => {
                                if (typeof rowItem[key] === 'object') {
                                    let styleId = 'w' + itable + 'c' + irowItem + 'r' + ikey;

                                    result += `<Style ss:ID="` + styleId + `" >
                                                    `+ this._GetAlignment(<eeCellStyle>rowItem[key].style) + `
                                                    `+ this._GetBorders(<eeCellStyle>rowItem[key].style) + `
                                                    `+ this._GetFont(<eeCellStyle>rowItem[key].style) + `
                                                    `+ this._GetBackground(<eeCellStyle>rowItem[key].style) + `
                                                    `+ this._GetNumberFormat(item.columns[ikey]) + `
                                                </Style>`;

                                    rowItem[key].style.styleId = 'w' + itable + 'c' + irowItem + 'r' + ikey;
                                }
                            });
                        });
                    }
                });
            });

            result += '</Styles>';
            return result;
        }

        private _GetWorkSheets() {
            var result = '';

            this.dataSet.forEach((item, itable) => {
                var rows = '<Row ss:AutoFitHeight="0">';
                var cols = '';

                item.columns.forEach((column, icolumn) => {
                    let hstyleId = 'w' + itable + 'h';
                    cols += '<Column ss:AutoFitWidth="0" ss:StyleID="' + hstyleId + '" ss:Width="' + column.width + '" />';

                    let hcstyleId = 'w' + itable + 'hc' + icolumn;
                    rows += `<Cell ss:StyleID="` + hcstyleId + `">
                                <Data ss:Type="String">` + column.headerText + `</Data>
                            </Cell>`;
                });

                rows += '</Row>';
                item.rows.forEach((row, irow) => {
                    if (row) {
                        row.items.forEach((rowItem, irowItem) => {
                            rows += '<Row ss:AutoFitHeight="0">';
                            Object.keys(rowItem).forEach((key, ikey) => {
                                let styleId;
                                let cellData;

                                if (typeof rowItem[key] === 'object') {
                                    styleId = rowItem[key].style.styleId;
                                    cellData = rowItem[key].data;
                                }
                                else {
                                    let cstyleId = 'w' + itable + 'c' + ikey;
                                    styleId = cstyleId;
                                    cellData = rowItem[key];
                                }

                                switch (<eeCellTypes>item.columns[ikey].type._celltype) {
                                    case eeCellTypes.Boolean:
                                        cellData = cellData ? 1 : 0;
                                        break;
                                    case eeCellTypes.DateTime:
                                        cellData = new Date(cellData).toISOString();
                                        break;
                                    case eeCellTypes.Html:
                                        cellData = eeHelper.htmlEncode(cellData);
                                        break;
                                }

                                rows += `<Cell ss:StyleID="` + styleId + `">
                                            <Data ss:Type="`+ item.columns[ikey].type.cellType + `">` + cellData + `</Data>
                                        </Cell>`;
                            });
                            rows += '</Row>';
                        });
                    }
                });

                var rowCount = item.rows[0] ? (item.rows[0].items.length + 1) : 1;
                var table = `<Table ss:ExpandedColumnCount="` + item.columns.length + `" ss:ExpandedRowCount="` + rowCount + `" x:FullColumns="1" x:FullRows="1"`;

                if (item.defaultColumnWidth) {
                    table += 'ss:DefaultColumnWidth="' + item.defaultColumnWidth + '"';
                }

                if (item.defaultRowWidth) {
                    table += 'ss:DefaultRowHeight="' + item.defaultRowWidth + '"';
                }

                table += '>';
                table += cols;
                table += rows;
                table += '</Table>';

                var workSheet = `<Worksheet ss:Name="` + item.name + `">
                            `+ table + `
                            `+ this._GetWorksheetOptions() + `
                        </Worksheet>`;

                result += workSheet;
            });

            return result;
        }

        private _GetWorksheetOptions() {
            return `<WorksheetOptions xmlns="urn:schemas-microsoft-com:office:excel">
                        <PageSetup>
                            <Header x:Margin="0.3"/>
                            <Footer x:Margin="0.3"/>
                            <PageMargins x:Bottom="0.75" x:Left="0.7" x:Right="0.7" x:Top="0.75"/>
                        </PageSetup>
                        <Unsynced/>
                        <Print>
                            <ValidPrinterInfo/>
                            <HorizontalResolution>600</HorizontalResolution>
                            <VerticalResolution>600</VerticalResolution>
                        </Print>
                        <Selected/>
                        <Panes>
                            <Pane>
                                <Number>3</Number>
                                <ActiveRow>1</ActiveRow>
                                <ActiveCol>1</ActiveCol>
                            </Pane>
                        </Panes>
                        <ProtectObjects>False</ProtectObjects>
                        <ProtectScenarios>False</ProtectScenarios>
                    </WorksheetOptions>`;
        }

        public CreateExcel(isCompressed?: boolean, returnUrl?: boolean) {
            var result = '';

            result = `<?xml version="1.0"?>
                    <?mso-application progid="Excel.Sheet"?>
                    <Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
                        xmlns:o="urn:schemas-microsoft-com:office:office"
                        xmlns:x="urn:schemas-microsoft-com:office:excel"
                        xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
                        xmlns:html="http://www.w3.org/TR/REC-html40">
                        `+ this._GetDocumentProperties() + `
                        `+ this._GetOfficeDocumentSettings() + `
                        `+ this._GetExcelWorkbook() + `
                        `+ this._GetStyles() + `
                        `+ this._GetWorkSheets() + `
                    </Workbook>`;

            if (isCompressed) {
                result = eeHelper.RemoveSpaces(result);
            }

            if (returnUrl) {
                var blob = new Blob([result], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=' + this._encoding });
                result = window.URL.createObjectURL(blob);
            }

            return result;
        }
    }
}