/*
 * jQuery Excel Export Plugin Library
 * http://tarunbatta.blogspot.com/
 *
 * Copyright (c) 2013 Tarun Batta
 * Licensed under BTechCo licenses.
 * https://github.com/btechco/btechco_excelexport/wiki
 *
 */

(function ($) {

    $treedatatype = {
        Table: 1
        , Json: 2
        , Xml: 3
    }

    var $defaults = {
        containerid: null
        , datatype: $treedatatype.Table
        , dataset: null
        , columns: null
    };

    var $settings = $defaults;

    $.fn.btechco_excelexport = function (options) {
        $settings = $.extend({}, $defaults, options);

        switch ($settings.datatype) {
            case 1:
                Export($("#" + $settings.containerid).html());
                break;
            case 2:
                Export(ConvertJsonToTable());
                break;
            case 3:
                Export(ConvertXmlToTable());
                break;
        }

        function ConvertJsonToTable() {
            var result = "";

            result += "<thead><tr>";
            $($settings.columns).each(function (key, value) {
                result += "<th>";
                result += this.headertext;
                result += "</th>";
            });
            result += "</tr></thead>";

            result += "<tbody>";
            $($settings.dataset).each(function (key, value) {
                result += "<tr>";
                $($settings.columns).each(function (k, v) {
                    if (value.hasOwnProperty(this.datafield)) {
                        result += "<td>";
                        result += value[this.datafield];
                        result += "</td>";
                    }
                });
                result += "</tr>";
            });
            result += "</tbody>";

            return result;
        }

        function ConvertXmlToTable() {
            var result = "";

            result += "<thead><tr>";
            $($settings.columns).each(function (key, value) {
                result += "<th>";
                result += this.headertext;
                result += "</th>";
            });
            result += "</tr></thead>";

            result += "<tbody>";
            $($settings.dataset).find("row").each(function (key, value) {
                result += "<tr>";
                $($settings.columns).each(function (k, v) {
                    if ($(value).attr(this.datafield)) {
                        result += "<td>";
                        result += $(value).attr(this.datafield);
                        result += "</td>";
                    }
                });
                result += "</tr>";
            });
            result += "</tbody>";

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
            excelFile += "<table>";
            excelFile += htmltable.replace(/"/g, '\'');
            excelFile += "</table>";
            excelFile += "</body>";
            excelFile += "</html>";

            console.log(excelFile);

            //window.open('data:application/vnd.ms-excel,' + excelFile);
        }
    };
})(jQuery);