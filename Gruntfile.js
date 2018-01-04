module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                beautify: false,
                compress: {
                    sequences: true,
                    dead_code: true,
                    conditionals: true,
                    booleans: true,
                    unused: true,
                    if_return: true,
                    join_vars: true,
                    drop_console: true
                },
                mangle: false
            },
            dist: {
                src: 'dist/excelExportJs.js',
                dest: 'dist/excelExportJs.min.js'
            }
        },
        copy: {
            dist: {
                files: [{
                        src: 'src/index.ts',
                        dest: 'dist/index.ts'
                    },
                    {
                        src: 'src/index.d.ts',
                        dest: 'dist/index.d.ts'
                    },
                    {
                        src: 'src/index.js',
                        dest: 'dist/index.js'
                    },
                    {
                        src: 'src/excelExportJs.ts',
                        dest: 'dist/excelExportJs.ts'
                    },
                    {
                        src: 'src/excelExportJs.d.ts',
                        dest: 'dist/excelExportJs.d.ts'
                    },
                    {
                        src: 'src/excelExportJs.js',
                        dest: 'dist/excelExportJs.js'
                    }
                ]
            }
        },
        watch: {
            files: 'src/excelExportJs.js',
            tasks: ['uglify:app']
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Load the plugin that provides the "copy" task.
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Default task(s).
    grunt.registerTask('default', ['copy:dist', 'uglify:dist']);
};