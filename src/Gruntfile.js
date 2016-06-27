module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json')
        , uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'Scripts/jquery.techbytarun.excelexportjs.js',
                dest: 'Scripts/jquery.techbytarun.excelexportjs.min.js'
            },
            dist: {
                src: 'Scripts/jquery.techbytarun.excelexportjs.js',
                dest: '../dist/jquery.techbytarun.excelexportjs.min.js'
            }
        }
        , copy: {
            main: {
                src: 'Scripts/jquery.techbytarun.excelexportjs.js',
                dest: '../dist/jquery.techbytarun.excelexportjs.js'
            }
        }
        , watch: {
            files: 'Scripts/jquery.techbytarun.excelexportjs.js'
            , tasks: ['uglify']
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Load the plugin that provides the "copy" task.
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Default task(s).
    grunt.registerTask('default', ['uglify', 'copy']);
};