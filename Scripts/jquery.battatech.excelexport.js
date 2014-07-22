/*
 * jQuery Client Side Excel Export Plugin Library
 * http://www.battatech.com/
 *
 * Copyright (c) 2013 Batta Tech Private Limited
 * Licensed under https://github.com/battatech/battatech_excelexport/blob/master/LICENSE.txt
 */

(function ($) {

    $datatype = {
        Table: 1
        , Json: 2
        , Xml: 3
        , JqGrid: 4
    }

    var $defaults = {
        containerid: null
        , datatype: $datatype.Table
        , dataset: null
        , columns: null
        , returnUri: false
        , worksheetName: "My Worksheet"
    };

    var $settings = $defaults;

    $.fn.btechco_excelexport = function (options) {
        $settings = $.extend({}, $defaults, options);

        var gridData = [];
        var excelData;

        return Initialize();

        function Initialize() {
            BuildDataStructure();

            switch ($settings.datatype) {
                case 1:
                    excelData = Export(ConvertFromTable());
                    break;
                case 2:
                    excelData = Export(ConvertDataStructureToTable());
                    break;
                case 3:
                    excelData = Export(ConvertDataStructureToTable());
                    break;
                case 4:
                    excelData = Export(ConvertDataStructureToTable());
                    break;
            }

            if ($settings.returnUri) {
                return excelData;
            }
            else {
                window.open(excelData);
            }
        }

        function BuildDataStructure() {
            switch ($settings.datatype) {
                case 1:
                    break;
                case 2:
                    gridData = $settings.dataset;
                    break;
                case 3:
                    $($settings.dataset).find("row").each(function (key, value) {
                        var item = {};

                        if (this.attributes != null && this.attributes.length > 0) {
                            $(this.attributes).each(function () {
                                item[this.name] = this.value;
                            });

                            gridData.push(item);
                        }
                    });
                    break;
                case 4:
                    $($settings.dataset).find("rows > row").each(function (key, value) {
                        var item = {};

                        if (this.children != null && this.children.length > 0) {
                            $(this.children).each(function () {
                                item[this.tagName] = $(this).text();
                            });

                            gridData.push(item);
                        }
                    });
                    break;
            }
        }

        function ConvertFromTable() {
            var result = $('<div>').append($('#' + $settings.containerid).clone()).html();
            return result;
        }

        function ConvertDataStructureToTable() {
            var result = "<table>";

            result += "<thead><tr>";
            $($settings.columns).each(function (key, value) {
                if (this.ishidden != true) {
                    result += "<th";
                    if (this.width != null) {
                        result += " style='width: " + this.width + "'";
                    }
                    result += ">";
                    result += this.headertext;
                    result += "</th>";
                }
            });
            result += "</tr></thead>";

            result += "<tbody>";
            $(gridData).each(function (key, value) {
                result += "<tr>";
                $($settings.columns).each(function (k, v) {
                    if (value.hasOwnProperty(this.datafield)) {
                        if (this.ishidden != true) {
                            result += "<td";
                            if (this.width != null) {
                                result += " style='width: " + this.width + "'";
                            }
                            result += ">";
                            result += value[this.datafield];
                            result += "</td>";
                        }
                    }
                });
                result += "</tr>";
            });
            result += "</tbody>";

            result += "</table>";
            return result;
        }

        function Export(htmltable) {
            var excelFile = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:x='urn:schemas-microsoft-com:office:excel' xmlns='http://www.w3.org/TR/REC-html40'>";
            excelFile += "<head>";
            excelFile += "<!--[if gte mso 9]>";
            excelFile += "<xml>";
            excelFile += "<x:ExcelWorkbook>";
            excelFile += "<x:ExcelWorksheets>";
            excelFile += "<x:ExcelWorksheet>";
            excelFile += "<x:Name>";
            excelFile += "{worksheet}";
            excelFile += "</x:Name>";
            excelFile += "<x:WorksheetOptions>";
            excelFile += "<x:DisplayGridlines/>";
            excelFile += "</x:WorksheetOptions>";
            excelFile += "</x:ExcelWorksheet>";
            excelFile += "</x:ExcelWorksheets>";
            excelFile += "</x:ExcelWorkbook>";
            excelFile += "</xml>";
            excelFile += "<![endif]-->";
            excelFile += "</head>";
            excelFile += "<body>";
            excelFile += htmltable.replace(/"/g, '\'');
            excelFile += "</body>";
            excelFile += "</html>";

            var uri = "data:application/vnd.ms-excel;base64,";
            var ctx = { worksheet: $settings.worksheetName, table: htmltable };

            return (uri + base64(format(excelFile, ctx)));
        }

        function base64(s) {
            return window.btoa(unescape(encodeURIComponent(s)));
        }

        function format(s, c) {
            return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; });
        }
    };
})(jQuery);
