"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var excelExportJs;
(function (excelExportJs) {
    'use strict';
    var eeCellTypes;
    (function (eeCellTypes) {
        eeCellTypes[eeCellTypes["Boolean"] = 0] = "Boolean";
        eeCellTypes[eeCellTypes["DateTime"] = 1] = "DateTime";
        eeCellTypes[eeCellTypes["Float"] = 2] = "Float";
        eeCellTypes[eeCellTypes["Html"] = 3] = "Html";
        eeCellTypes[eeCellTypes["Number"] = 4] = "Number";
        eeCellTypes[eeCellTypes["Percent"] = 5] = "Percent";
        eeCellTypes[eeCellTypes["String"] = 6] = "String";
    })(eeCellTypes = excelExportJs.eeCellTypes || (excelExportJs.eeCellTypes = {}));
    var eeHorizontalCellAlignment;
    (function (eeHorizontalCellAlignment) {
        eeHorizontalCellAlignment["Center"] = "Center";
        eeHorizontalCellAlignment["Left"] = "Left";
        eeHorizontalCellAlignment["Right"] = "Right";
    })(eeHorizontalCellAlignment = excelExportJs.eeHorizontalCellAlignment || (excelExportJs.eeHorizontalCellAlignment = {}));
    var eeVerticalCellAlignment;
    (function (eeVerticalCellAlignment) {
        eeVerticalCellAlignment["Bottom"] = "Bottom";
        eeVerticalCellAlignment["Center"] = "Center";
        eeVerticalCellAlignment["Top"] = "Top";
    })(eeVerticalCellAlignment = excelExportJs.eeVerticalCellAlignment || (excelExportJs.eeVerticalCellAlignment = {}));
    var eeAlignment = (function () {
        function eeAlignment(hAlign, vAlign, isWrap) {
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
        return eeAlignment;
    }());
    excelExportJs.eeAlignment = eeAlignment;
    var eeBackground = (function () {
        function eeBackground(color, pattern) {
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
        return eeBackground;
    }());
    excelExportJs.eeBackground = eeBackground;
    var eeFont = (function () {
        function eeFont(name, family, size, color, isBold) {
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
        return eeFont;
    }());
    excelExportJs.eeFont = eeFont;
    var eeCellStyle = (function () {
        function eeCellStyle(background, alignment, font, isBordered) {
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
        return eeCellStyle;
    }());
    excelExportJs.eeCellStyle = eeCellStyle;
    var eeColumnType = (function () {
        function eeColumnType(_celltype) {
            this._celltype = eeCellTypes.String;
            this.cellType = 'String';
            this.format = '@';
            if (_celltype) {
                this._celltype = _celltype;
                switch (_celltype) {
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
        return eeColumnType;
    }());
    excelExportJs.eeColumnType = eeColumnType;
    var eeCell = (function () {
        function eeCell(data) {
            this.data = data;
        }
        return eeCell;
    }());
    excelExportJs.eeCell = eeCell;
    var eeRow = (function () {
        function eeRow(data) {
            this.items = data;
        }
        return eeRow;
    }());
    excelExportJs.eeRow = eeRow;
    var eeColumn = (function () {
        function eeColumn(name, headerText, type, width, isVisible, style) {
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
        return eeColumn;
    }());
    excelExportJs.eeColumn = eeColumn;
    var eeTable = (function () {
        function eeTable(name, columns, rows, headerStyle, defaultColumnWidth, defaultRowWidth) {
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
        return eeTable;
    }());
    excelExportJs.eeTable = eeTable;
    var eeHelper = (function () {
        function eeHelper() {
        }
        eeHelper.RemoveSpaces = function (html) {
            var lines = html.split(/(?:\r\n|\n|\r)/);
            return lines.map(function (line) {
                return line.replace(/^\s+/gm, '');
            }).join(' ').trim();
        };
        eeHelper.htmlEncode = function (html) {
            return String(html).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
        };
        return eeHelper;
    }());
    excelExportJs.eeHelper = eeHelper;
    var excelExport = (function () {
        function excelExport(dataSet, fileName, author, company, version, style) {
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
        excelExport.prototype._GetFileName = function () {
            return this.fileName + '.' + this._fileExtension;
        };
        excelExport.prototype._GetDocumentProperties = function () {
            return "<DocumentProperties xmlns=\"urn:schemas-microsoft-com:office:office\">\n                        <Author>" + this.author + "</Author>\n                        <Created>" + new Date().toISOString() + "</Created>\n                        <Company>" + this.company + "</Company>\n                        <Version>" + this.version + "</Version>\n                    </DocumentProperties>";
        };
        excelExport.prototype._GetOfficeDocumentSettings = function () {
            return "<OfficeDocumentSettings xmlns=\"urn:schemas-microsoft-com:office:office\">\n                        <AllowPNG/>\n                    </OfficeDocumentSettings>";
        };
        excelExport.prototype._GetExcelWorkbook = function () {
            return "<ExcelWorkbook xmlns=\"urn:schemas-microsoft-com:office:excel\">\n                        <WindowHeight>8958</WindowHeight>\n                        <WindowWidth>11358</WindowWidth>\n                        <WindowTopX>480</WindowTopX>\n                        <WindowTopY>18</WindowTopY>\n                        <ProtectStructure>False</ProtectStructure>\n                        <ProtectWindows>False</ProtectWindows>\n                    </ExcelWorkbook>";
        };
        excelExport.prototype._GetBorders = function (style) {
            var result = '';
            if (style && style.isBordered) {
                result = "<Borders>\n                            <Border ss:Position=\"Bottom\" ss:LineStyle=\"Continuous\" ss:Weight=\"1\"/>\n                            <Border ss:Position=\"Left\" ss:LineStyle=\"Continuous\" ss:Weight=\"1\"/>\n                            <Border ss:Position=\"Right\" ss:LineStyle=\"Continuous\" ss:Weight=\"1\"/>\n                            <Border ss:Position=\"Top\" ss:LineStyle=\"Continuous\" ss:Weight=\"1\"/>\n                        </Borders>";
            }
            else {
                result = '<Borders/>';
            }
            return result;
        };
        excelExport.prototype._GetAlignment = function (style) {
            var result = '';
            if (style) {
                var wrap = style.alignment.isWrap ? 1 : 0;
                result = '<Alignment ss:Horizontal="' + style.alignment.hAlign + '" ss:Vertical="' + style.alignment.vAlign + '" ss:WrapText="' + wrap + '"/>';
            }
            else {
                result = '<Alignment/>';
            }
            return result;
        };
        excelExport.prototype._GetBackground = function (style) {
            var result = '';
            if (style) {
                result = '<Interior ss:Color="' + style.background.color + '" ss:Pattern="' + style.background.pattern + '"/>';
            }
            else {
                result = '<Interior/>';
            }
            return result;
        };
        excelExport.prototype._GetFont = function (style) {
            var result = '';
            if (style) {
                var bold = style.font.isBold ? 1 : 0;
                result = '<Font ss:FontName="' + style.font.name + '" x:Family="' + style.font.family + '" ss:Size="' + style.font.size + '" ss:Color="' + style.font.color + '" ss:Bold="' + bold + '"/>';
            }
            else {
                result = '<Font/>';
            }
            return result;
        };
        excelExport.prototype._GetNumberFormat = function (column) {
            var result = '';
            if (column) {
                switch (column.type._celltype) {
                    case eeCellTypes.Boolean:
                        result = '<NumberFormat/>';
                        break;
                    default:
                        result = "<NumberFormat ss:Format=\"" + column.type.format + "\"/>";
                }
            }
            else {
                result = '<NumberFormat/>';
            }
            return result;
        };
        excelExport.prototype._GetStyles = function () {
            var _this = this;
            var result = '<Styles>';
            result += "<Style ss:ID=\"Default\" ss:Name=\"Normal\">\n                            " + this._GetAlignment(this.style) + "\n                            " + this._GetBorders(this.style) + "\n                            " + this._GetFont(this.style) + "\n                            " + this._GetBackground(this.style) + "\n                            " + this._GetNumberFormat(null) + "\n                            <Protection/>\n                        </Style>";
            this.dataSet.forEach(function (item, itable) {
                var hstyleId = 'w' + itable + 'h';
                result += "<Style ss:ID=\"" + hstyleId + "\" >\n                                " + _this._GetAlignment(item.headerStyle) + "\n                            </Style>";
                item.columns.forEach(function (column, icolumn) {
                    var hcstyleId = 'w' + itable + 'hc' + icolumn;
                    result += "<Style ss:ID=\"" + hcstyleId + "\" >\n                                    " + _this._GetAlignment(item.headerStyle) + "\n                                    " + _this._GetBorders(item.headerStyle) + "\n                                    " + _this._GetFont(item.headerStyle) + "\n                                    " + _this._GetBackground(item.headerStyle) + "\n                                    " + _this._GetNumberFormat(column) + "\n                                </Style>";
                    var cstyleId = 'w' + itable + 'c' + icolumn;
                    result += "<Style ss:ID=\"" + cstyleId + "\" >\n                                    " + _this._GetAlignment(column.style) + "\n                                    " + _this._GetBorders(column.style) + "\n                                    " + _this._GetFont(column.style) + "\n                                    " + _this._GetNumberFormat(column) + "\n                                </Style>";
                });
                item.rows.forEach(function (row, irow) {
                    if (row) {
                        row.items.forEach(function (rowItem, irowItem) {
                            Object.keys(rowItem).forEach(function (key, ikey) {
                                if (typeof rowItem[key] === 'object') {
                                    var styleId = 'w' + itable + 'c' + irowItem + 'r' + ikey;
                                    result += "<Style ss:ID=\"" + styleId + "\" >\n                                                    " + _this._GetAlignment(rowItem[key].style) + "\n                                                    " + _this._GetBorders(rowItem[key].style) + "\n                                                    " + _this._GetFont(rowItem[key].style) + "\n                                                    " + _this._GetBackground(rowItem[key].style) + "\n                                                    " + _this._GetNumberFormat(item.columns[ikey]) + "\n                                                </Style>";
                                    rowItem[key].style.styleId = 'w' + itable + 'c' + irowItem + 'r' + ikey;
                                }
                            });
                        });
                    }
                });
            });
            result += '</Styles>';
            return result;
        };
        excelExport.prototype._GetWorkSheets = function () {
            var _this = this;
            var result = '';
            this.dataSet.forEach(function (item, itable) {
                var rows = '<Row ss:AutoFitHeight="0">';
                var cols = '';
                item.columns.forEach(function (column, icolumn) {
                    var hstyleId = 'w' + itable + 'h';
                    cols += '<Column ss:AutoFitWidth="0" ss:StyleID="' + hstyleId + '" ss:Width="' + column.width + '" />';
                    var hcstyleId = 'w' + itable + 'hc' + icolumn;
                    rows += "<Cell ss:StyleID=\"" + hcstyleId + "\">\n                                <Data ss:Type=\"String\">" + column.headerText + "</Data>\n                            </Cell>";
                });
                rows += '</Row>';
                item.rows.forEach(function (row, irow) {
                    if (row) {
                        row.items.forEach(function (rowItem, irowItem) {
                            rows += '<Row ss:AutoFitHeight="0">';
                            Object.keys(rowItem).forEach(function (key, ikey) {
                                var styleId;
                                var cellData;
                                if (typeof rowItem[key] === 'object') {
                                    styleId = rowItem[key].style.styleId;
                                    cellData = rowItem[key].data;
                                }
                                else {
                                    var cstyleId = 'w' + itable + 'c' + ikey;
                                    styleId = cstyleId;
                                    cellData = rowItem[key];
                                }
                                switch (item.columns[ikey].type._celltype) {
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
                                rows += "<Cell ss:StyleID=\"" + styleId + "\">\n                                            <Data ss:Type=\"" + item.columns[ikey].type.cellType + "\">" + cellData + "</Data>\n                                        </Cell>";
                            });
                            rows += '</Row>';
                        });
                    }
                });
                var rowCount = item.rows[0] ? (item.rows[0].items.length + 1) : 1;
                var table = "<Table ss:ExpandedColumnCount=\"" + item.columns.length + "\" ss:ExpandedRowCount=\"" + rowCount + "\" x:FullColumns=\"1\" x:FullRows=\"1\"";
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
                var workSheet = "<Worksheet ss:Name=\"" + item.name + "\">\n                            " + table + "\n                            " + _this._GetWorksheetOptions() + "\n                        </Worksheet>";
                result += workSheet;
            });
            return result;
        };
        excelExport.prototype._GetWorksheetOptions = function () {
            return "<WorksheetOptions xmlns=\"urn:schemas-microsoft-com:office:excel\">\n                        <PageSetup>\n                            <Header x:Margin=\"0.3\"/>\n                            <Footer x:Margin=\"0.3\"/>\n                            <PageMargins x:Bottom=\"0.75\" x:Left=\"0.7\" x:Right=\"0.7\" x:Top=\"0.75\"/>\n                        </PageSetup>\n                        <Unsynced/>\n                        <Print>\n                            <ValidPrinterInfo/>\n                            <HorizontalResolution>600</HorizontalResolution>\n                            <VerticalResolution>600</VerticalResolution>\n                        </Print>\n                        <Selected/>\n                        <Panes>\n                            <Pane>\n                                <Number>3</Number>\n                                <ActiveRow>1</ActiveRow>\n                                <ActiveCol>1</ActiveCol>\n                            </Pane>\n                        </Panes>\n                        <ProtectObjects>False</ProtectObjects>\n                        <ProtectScenarios>False</ProtectScenarios>\n                    </WorksheetOptions>";
        };
        excelExport.prototype.CreateExcel = function (isCompressed, returnUrl) {
            var result = '';
            result = "<?xml version=\"1.0\"?>\n                    <?mso-application progid=\"Excel.Sheet\"?>\n                    <Workbook xmlns=\"urn:schemas-microsoft-com:office:spreadsheet\"\n                        xmlns:o=\"urn:schemas-microsoft-com:office:office\"\n                        xmlns:x=\"urn:schemas-microsoft-com:office:excel\"\n                        xmlns:ss=\"urn:schemas-microsoft-com:office:spreadsheet\"\n                        xmlns:html=\"http://www.w3.org/TR/REC-html40\">\n                        " + this._GetDocumentProperties() + "\n                        " + this._GetOfficeDocumentSettings() + "\n                        " + this._GetExcelWorkbook() + "\n                        " + this._GetStyles() + "\n                        " + this._GetWorkSheets() + "\n                    </Workbook>";
            if (isCompressed) {
                result = eeHelper.RemoveSpaces(result);
            }
            if (returnUrl) {
                var blob = new Blob([result], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=' + this._encoding });
                result = window.URL.createObjectURL(blob);
            }
            return result;
        };
        return excelExport;
    }());
    excelExportJs.excelExport = excelExport;
})(excelExportJs = exports.excelExportJs || (exports.excelExportJs = {}));
//# sourceMappingURL=excelExportJs.js.map