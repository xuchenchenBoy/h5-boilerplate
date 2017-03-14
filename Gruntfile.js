module.exports = function(grunt) {

    var baseUrl = '', // 资源文件URL的前缀

        ts = '1489481733964'; // 资源文件的时间戳

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            main_js: ['src/js/main.js'],
            grunt_js: ['Gruntfile.js'],
            options: {
                globals: {
                    document: true,
                    console: true,
                    jquery: true
                }
            },
            reporterOutput: ''
        },

        uglify: {
            options: {
                banner: '/* <%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %> */\n'
            },
            mobile: {
                files: {
                    'dist/js/main.min.js': ['src/js/zepto.js', 'src/js/fastclick.js', 'src/js/main.js']
                }
            }
        },

        processhtml: {
            options: {
                data: {
                    ts: ts
                }
            },
            mobile: {
                files: {
                    'index.html': ['index_test.html']
                }
            }
        },

        cssmin: {
            mobile: {
                options: {
                    banner: '/* <%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %> */\n',
                    noAdvanced : true
                },
                files: {
                    'dist/css/main.min.css': ['build/css/replaced/main.css']
                }
            }
        },

        replace: {
            mobile: {
                options: {
                    patterns: [
                        {
                            match: /\.\.\/\.\.\//g,
                            replacement: baseUrl
                        },
                        {
                            match: 'ts',
                            replacement: ts
                        }
                    ]
                },
                files: [
                    {expand: true, flatten: true, src: ['build/css/main.css'], dest: 'build/css/replaced'}
                ]
            }
        },

        less: {
            mobile: {
                options: {
                    banner: '/* <%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %> */\n',
                },
                files: {
                    'build/css/main.css': ['src/less/reset.less', 'src/less/main.less']
                }
            }
        },

        connect: {
            server: {
                options: {
                    port: 8080,
                    hostname: 'localhost',
                    livereload: true,
                    keepalive:true
                }
            }
        },

        watch: {
            lessMoble: {
                files: ['src/less/main.less'],
                tasks: ['less:mobile']
            },
            css: {
                files: ['src/css/*.css', 'build/css/*.css'],
                options: {
                    livereload: true
                }
            },
            page: {
                files: ['*.html'],
                options: {
                    livereload: true
                }
            },
            script: {
                files: ['src/js/*.js'],
                tasks: ['jshint:main_js'],
                options: {
                    livereload: true
                }
            },
            gruntFile: {
                files: ['Gruntfile.js'],
                tasks: ['jshint:grunt_js']
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['jshint:main_js', 'uglify', 'less', 'replace', 'cssmin', 'processhtml']);
    grunt.registerTask('re', ['replace']);
    grunt.registerTask('style', ['less', 'replace', 'cssmin']);
    grunt.registerTask('refresh', ['processhtml']);
    grunt.registerTask('comp', ['uglify']);
    grunt.registerTask('test', ['connect:server', 'watch']);
};
