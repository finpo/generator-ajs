// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'


module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    yeoman: {
      // configurable paths
      app: require('./bower.json').appPath || 'app',
      dist: 'dist'
    },

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['bowerInstall']
      },<% if (coffee) { %>
      coffee: {
        files: ['<%%= yeoman.app %>/scripts/{,*/}*.{coffee,litcoffee,coffee.md}'],
        tasks: ['newer:coffee:dist']
      },
      coffeeTest: {
        files: ['test/spec/{,*/}*.{coffee,litcoffee,coffee.md}'],
        tasks: ['newer:coffee:test', 'karma']
      },<% } else { %>
      js: {
        files: ['<%%= yeoman.app %>/scripts/{,*/}*.js'],
        tasks: ['newer:jshint:all'],
        options: {
          livereload: '<%%= connect.options.livereload %>'
        }
      },
      jsTest: {
        files: ['test/spec/{,*/}*.js'],
        tasks: ['newer:jshint:test', 'karma']
      },<% } %><% if (stylus) { %>
      stylus: {
        files: ['<%%= yeoman.app %>/styles/{,*/}*.styl'],
        tasks: ['stylus:server', 'autoprefixer']
      },<% } else { %>
      styles: {
        files: ['<%%= yeoman.app %>/styles/{,*/}*.css'],
        tasks: ['newer:copy:styles', 'autoprefixer']
      },<% } %><% if (jade) { %>
      jade: {
        files: ['<%%= yeoman.app %>/views/{,*/}*.jade', '<%%= yeoman.app %>/*.jade'],
        tasks: ['bowerInstall', 'jade:server']
      },<% } %>
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%%= connect.options.livereload %>'
        },
        files: [<% if (jade) { %>
          '.tmp/{,*/}*.html',<% } else {%>
          '<%%= yeoman.app %>/{,*/}*.html',<% }%><% if (stylus) { %>
          '.tmp/styles/{,*/}*.css',<% } else {%>
          '<%%= yeoman.app %>/styles/{,*/}*.css',<% }%><% if (coffee) { %>
          '.tmp/scripts/{,*/}*.js',<% } else {%>
          '<%%= yeoman.app %>/scripts/{,*/}*.js',<% }%>
          '<%%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    <% if (stylus) { %>
    stylus: {
      test: {
        options: {
          compress: false
        },
        files: {
          '.tmp/styles/main.css': ['<%%= yeoman.app %>/styles/{,*/}*.styl']
        }
      },
      server: {
        options: {
          compress: false
        },
        files: {
          '.tmp/styles/main.css': ['<%%= yeoman.app %>/styles/{,*/}*.styl']
        }
      },
      dist: {
        options: {
          compress: true
        },
        files: {
          '.tmp/styles/main.css': ['<%%= yeoman.app %>/styles/{,*/}*.styl']
        }
      }
    },
    <% }%>

    <% if (jade) { %>
    jade: {
      options: {
        pretty: true
      },
      server: {
        files: [{
          expand: true,
          cwd: '<%%= yeoman.app %>',
          dest: '.tmp',
          src: ['*.jade', 'views/{,*/}*.jade'],
          ext: '.html'
        }]
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= yeoman.app %>',
          dest: '<%%= yeoman.dist %>',
          src: ['*.jade', 'views/{,*/}*.jade'],
          ext: '.html'
        }]
      }
    },
    <% }%>

    // The actual grunt server settings
    connect: {
      options: {
        middleware: function (connect, options) {
          var optBase = (typeof options.base === 'string') ? [options.base] : options.base;
          return [require('connect-modrewrite')(['!(\\..+)$ / [L]'])].concat(
            optBase.map(function(path){ return connect.static(path); }));
        },
        port: grunt.option('port') || 9000 ,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: '0.0.0.0',
        livereload: grunt.option('port') ? grunt.option('port') > 9000 ? 35729+parseInt(grunt.option('port'))-9000 : 35729+Math.floor((Math.random() * 10) + 1) : 35729
      },
      livereload: {
        options: {
          open: true,
          base: [
            '.tmp',
            '<%%= yeoman.app %>'
          ]
        }
      },
      test: {
        options: {
          port: parseInt(grunt.option('port'))+1 || 9001,
          base: [
            '.tmp',
            'test',
            '<%%= yeoman.app %>'
          ]
        }
      },
      dist: {
        options: {
          base: '<%%= yeoman.dist %>'
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js'<% if (!coffee) { %>,
          '<%%= yeoman.app %>/scripts/{,*/}*.js'<% } %>
        ]
      }<% if (!coffee) { %>,
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/spec/{,*/}*.js']
      }<% } %>
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%%= yeoman.dist %>/*',
            '!<%%= yeoman.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

    // Automatically inject Bower components into the app
    bowerInstall: {
      app: {<% if (jade) { %>
        src: ['<%%= yeoman.app %>/index.jade'],
        <% } else {%>
        src: ['<%%= yeoman.app %>/index.html'],
        <% }%>
        ignorePath: '<%%= yeoman.app %>/'
      }
    },<% if (coffee) { %>

    // Compiles CoffeeScript to JavaScript
    coffee: {
      options: {
        sourceMap: true,
        sourceRoot: ''
      },
      server: {
        files: [{
          expand: true,
          cwd: '<%%= yeoman.app %>/scripts',
          src: '{,*/}*.coffee',
          dest: '.tmp/scripts',
          ext: '.js'
        }]
      },
      dist: {
        sourceMap: false,
        files: [{
          expand: true,
          cwd: '<%%= yeoman.app %>/scripts',
          src: '{,*/}*.coffee',
          dest: '.tmp/scripts',
          ext: '.js'
        }]
      },
      test: {
        files: [{
          expand: true,
          cwd: 'test/spec',
          src: '{,*/}*.coffee',
          dest: '.tmp/spec',
          ext: '.js'
        }]
      }
    },<% } %>

    // Renames files for browser caching purposes
    rev: {
      dist: {
        files: {
          src: [
            '<%%= yeoman.dist %>/scripts/{,*/}*.js',
            '<%%= yeoman.dist %>/styles/{,*/}*.css'
            // ,
            // '<%%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
            // '<%%= yeoman.dist %>/styles/fonts/*'
          ]
        }
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '<%%= yeoman.dist %>/index.html',
      options: {
        root: '<%%= yeoman.app %>',
        dest: '<%%= yeoman.dist %>',
        flow: {
          html: {
            steps: {
              js: ['concat'], // 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      html: ['<%%= yeoman.dist %>/{,*/}*.html'],
      css: ['<%%= yeoman.dist %>/styles/{,*/}*.css'],
      options: {
        assetsDirs: ['<%%= yeoman.dist %>']
      }
    },

    // The following *-min tasks produce minified files in the dist folder
    cssmin: {
      options: {
        //root: '<%%= yeoman.app %>'
        root : ''
      }
    },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= yeoman.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%%= yeoman.dist %>/images'
        }]
      }
    },

    // svgmin: {
    //   dist: {
    //     files: [{
    //       expand: true,
    //       cwd: '<%%= yeoman.app %>/images',
    //       src: '{,*/}*.svg',
    //       dest: '<%%= yeoman.dist %>/images'
    //     }]
    //   }
    // },

    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: '<%%= yeoman.dist %>',
          src: ['*.html', 'views/{,*/}*.html'],
          dest: '<%%= yeoman.dist %>'
        }]
      }
    },

    // ngmin tries to make the code safe for minification automatically by
    // using the Angular long form for dependency injection. It doesn't work on
    // things like resolve or inject so those have to be done manually.
    ngmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/scripts',
          src: '*.js',
          dest: '.tmp/concat/scripts'
        }]
      }
    },

    // Replace Google CDN references
    cdnify: {
      dist: {
        html: ['<%%= yeoman.dist %>/*.html']
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%%= yeoman.app %>',
          dest: '<%%= yeoman.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            '*.html',
            'views/{,*/}*.html',
            'images/{,**/}*',
            'fonts/*'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%%= yeoman.dist %>/images',
          src: ['generated/*']
        }, {
          expand: true,
          cwd: '<%= yeoman.app %>/bower_components/font-awsome',
          dest: '<%= yeoman.dist %>',
          src: 'fonts/*'
        }]
      },
      styles: {
        expand: true,
        cwd: '<%%= yeoman.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [<% if (coffee) { %>
        'coffee:server',<% } %><% if (stylus) { %>
        'stylus:server'<% } else { %>
        'copy:styles'<% } %>
      ],
      test: [<% if (coffee) { %>
        'coffee:server',
        'coffee:test',<% } %><% if (stylus) { %>
        'stylus:test'<% } else { %>
        'copy:styles'<% } %>
      ],
      dist: [<% if (!stylus) { %>
        'copy:styles',<% } %>
        'imagemin'
        //,
        //'svgmin'
      ]
    },

    // By default, your `index.html`'s <!-- Usemin block --> will take care of
    // minification. These next options are pre-configured if you do not wish
    // to use the Usemin blocks.
    // cssmin: {
    //   dist: {
    //     files: {
    //       '<%%= yeoman.dist %>/styles/main.css': [
    //         '.tmp/styles/{,*/}*.css',
    //         '<%%= yeoman.app %>/styles/{,*/}*.css'
    //       ]
    //     }
    //   }
    // },
    uglify: {
      dist: {
        files: {
          '<%%= yeoman.dist %>/scripts/vendor.js': [
            '<%%= yeoman.dist %>/scripts/vendor.js'
          ]
        }
      }
    },
    // concat: {
    //   dist: {}
    // },

    // Test settings
    karma: {
      unit: {<% if (coffee) { %>
        configFile: 'test/karma.conf.coffee',<% } else { %>
        configFile: 'test/karma.conf.js',<% } %>
        singleRun: true,
        options: {
          basePath: '../',
          files: [
            '<%%= yeoman.app %>/bower_components/angular/angular.js',
            '<%%= yeoman.app %>/bower_components/angular-cookies/angular-cookies.js',
            '<%%= yeoman.app %>/bower_components/angular-mocks/angular-mocks.js',
            '<%%= yeoman.app %>/bower_components/angular-resource/angular-resource.js',
            '<%%= yeoman.app %>/bower_components/angular-route/angular-route.js',
            '<%%= yeoman.app %>/bower_components/angular-sanitize/angular-sanitize.js',<% if (coffee) { %>
            '<%%= yeoman.app %>/scripts/**/*.coffee',
            'test/mock/**/*.coffee',
            'test/spec/**/*.coffee'<% } else { %>
            '<%%= yeoman.app %>/scripts/**/*.js',
            'test/mock/**/*.js',
            'test/spec/**/*.js'<% } %>
          ]
        }
      }
    }
  });


  grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'bowerInstall',<% if (jade) { %>
      'jade:server',<% } %>
      'concurrent:server',
      'autoprefixer',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve:' + target]);
  });

  grunt.registerTask('test', [
    'clean:server',
    'concurrent:test',
    'autoprefixer',
    'connect:test',
    'karma'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'bowerInstall',<% if (jade) { %>
    'jade:dist',<% } %><% if (coffee) { %>
    'coffee:dist',<% } %><% if (stylus) { %>
    'stylus:dist',<% } %>
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'concat',
    'ngmin',
    'copy:dist',
    'cdnify',
    'cssmin',
    'uglify',
    'rev',
    'usemin',
    'htmlmin'
  ]);

  grunt.registerTask('default', [
    // 'newer:jshint',
    // 'test',
    // 'build'
    'serve'
  ]);
};
