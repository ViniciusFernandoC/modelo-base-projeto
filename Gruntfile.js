module.exports = function (grunt) {

    var srcDir = 'src';
    var buildDir = 'www';

    // configure the tasks
    grunt.initConfig({
        clean: {
            all: {
                src: [buildDir]
            },
        },
        connect: {
            server: {
                options: {
                    port: 8300,
                    // protocol: 'https',
                    base: buildDir,
                    hostname: '*',
                    middleware: function (connect, options, middlewares) {
                        // inject a custom middleware
                        middlewares.unshift(function (req, res, next) {
                            res.setHeader('Access-Control-Allow-Origin', '*');
                            res.setHeader('Access-Control-Allow-Methods', '*');
                            //a console.log('foo') here is helpful to see if it runs
                            return next();
                        });

                        return middlewares;
                    }
                }
            }
        },
        copy: {
            all: {
                cwd: srcDir,
                src: ['**', '!**/*-spec.js'],
                dest: buildDir,
                expand: true
            },
        },
        cssmin: {
            all: {
                files: [{
                    expand: true,
                    cwd: srcDir,
                    src: '**/*.css',
                    dest: buildDir,
                    ext: '.min.css'
                }]
            }
        },
        htmllint: {
            all: {
                options: {
                    force: true,
                    'id-class-style': false,
                    'attr-name-style': false,
                    'attr-req-value': false,
                    'tag-bans': []
                },
                src: [srcDir + '/**/*.html']
            }
        },
        jshint: {
            options: {
                jshintrc: true,
            },
            all: [srcDir + '/**/*.js', '!' + srcDir + '/**/*-spec.js', '!' + srcDir + '/lib/*.js']
        },
        strip_code: {
            options: {
                blocks: [{
                    start_block: '/* start-test-block */',
                    end_block: '/* end-test-block */'
                }, {
                    start_block: '<!-- start-html-test-code -->',
                    end_block: '<!-- end-html-test-code -->'
                }]
            },
            dist: {
                src: buildDir + '/**/*.*'
            }
        },
        uglify: {
            all: {
                files: [{
                    expand: true,
                    cwd: srcDir,
                    src: ['**/*.js', '!**/*-spec.js'],
                    dest: buildDir,
                    ext: '.min.js'
                }]
            }
        },
        watch: {
            files: [srcDir + '/**'],
            tasks: ['build']
        },
    });

    // load the tasks
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-htmllint');
    grunt.loadNpmTasks('grunt-strip-code');

    // define the tasks
    grunt.registerTask(
        'build',
        'Compila todos os assets e copia os arquivos para o diret??rio de build.', ['clean', 'jshint', 'htmllint', 'copy', 'cssmin', 'uglify']
    );

    grunt.registerTask(
        'default',
        'Observa o projeto por mudan??as, automaticamente contr??i e executa o servidor.', ['build', 'connect', 'watch']
    );

    grunt.registerTask(
        'dist',
        'Gera o projeto em sua vers??o final removendo eventuais c??digos de desenvolvimento.', ['build', 'strip_code']
    );
};