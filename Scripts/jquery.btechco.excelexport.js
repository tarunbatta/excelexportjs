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
        , url: null
        , async: false
        , dataset: null
        , datatype: $treedatatype.Table
    };

    var $settings = $defaults;

    $.fn.btechco_excelexport = function (options) {
        $settings = $.extend({}, $defaults, options);

        
    };
})(jQuery);