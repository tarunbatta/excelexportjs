module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json')
        , uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'Scripts/jquery.battatech.excelexport.js',
                dest: 'Scripts/jquery.battatech.excelexport.min.js'
            },
            dist: {
                src: 'Scripts/jquery.battatech.excelexport.js',
                dest: '../dist/jquery.battatech.excelexport.min.js'
            }
        }
        , copy: {
            main: {
                src: 'Scripts/jquery.battatech.excelexport.js',
                dest: '../dist/jquery.battatech.excelexport.js'
            }
        }
        , watch: {
            files: 'Scripts/jquery.battatech.excelexport.js'
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