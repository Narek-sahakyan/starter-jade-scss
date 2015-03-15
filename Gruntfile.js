module.exports = function(grunt) {

    /** 
     * Load required Grunt tasks. These are installed based on the versions listed
     * in `package.json` when you do `npm install` in this directory.
     */

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jade');

    var userConfig = {
        buildDir: "build",
        srcDir: "www"
    }

    var taskConfig = {

        copy: {
            assets: {
                files: [{
                    src: ['**'],
                    dest: '<%= buildDir %>/img/',
                    cwd: '<%= srcDir %>/img/',
                    expand: true
                }, {
                    src: ['**'],
                    dest: '<%= buildDir %>/fonts/',
                    cwd: '<%= srcDir %>/fonts/',
                    expand: true
                }, {
                    src: ['**'],
                    dest: '<%= buildDir %>/js/',
                    cwd: '<%= srcDir %>/js/',
                    expand: true
                }]
            }
        },
        jade: {
            compile: {
                options: {
                    client: false,
                    pretty: true,
                },
                files: [{
                    cwd: "<%= srcDir %>/",
                    src: ['**/*.jade', '!partials/**/*'],
                    dest: "<%= buildDir %>/",
                    expand: true,
                    ext: ".html"
                }]
            }
        },
        sass: {
            compile: {
                options: {
                    loadPath: require('node-bourbon').includePaths
                },
                files: {
                    '<%= buildDir %>/css/main.css': '<%= srcDir %>/sass/main.scss'
                }
            },
            bootstrap: {
                files: {
                    '<%= buildDir %>/css/bootstrap.css': '<%= srcDir %>/sass/bootstrap.scss'
                }
            }
        },
        delta: {

            options: {
                livereload: true
            },

            /**
             * When the SCSS files change, we need to compile and copy to build dir
             */
            sass: {
                files: ['<%= srcDir %>/**/*.scss'],
                tasks: ['sass:compile'],
                options: {
                    livereload: true
                },
            },

            /**
             * When .ejs file changes, we need to compile ejs into HTML.
             */
            html: {
                files: ['<%= srcDir %>/**/*.jade'],
                tasks: ['jade:compile'],
                options: {
                    livereload: true
                },
            },

            assets: {
                files: [
                    '<%= srcDir %>/img/**/*',
                    '<%= srcDir %>/fonts/**/*',
                    '<%= srcDir %>/js/**/*',
                ],
                tasks: ['copy:assets']
            },

            js: {
                files: ['<%= srcDir %>/js**/*'],
                options: {
                    livereload: true
                },
            }

        }
    }

    grunt.initConfig(grunt.util._.extend(taskConfig, userConfig));
    // grunt.config.init(taskConfig);

    grunt.renameTask('watch', 'delta');
    grunt.registerTask('watch', [
        'sass:bootstrap',
        'sass:compile',
        'jade:compile',
        'copy:assets',
        'delta'

    ]);

    grunt.registerTask('build', [
        'sass:bootstrap',
        'sass:compile',
        'jade:compile',
        'copy:assets'
    ]);

    grunt.registerTask('default', ['sass:bootstrap', 'sass:compile']);

}
