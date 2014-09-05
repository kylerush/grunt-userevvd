/*
 * grunt-userev
 * https://github.com/kylerush/grunt-userev
 *
 * Copyright (c) 2014 Kyle Rush
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    config: {
      fixture: 'test/fixtures',
      dest: 'test/dist'
    },
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp', '<%= config.dest %>']
    },
    copy: {
      fixture: {
        files: [
          {expand: true, cwd: '<%= config.fixture %>/', src: ['**'], dest: '<%= config.dest %>'}
        ]
      }
    },
    filerev: {
      fixture: {
        src: '<%= config.dest %>/**/*.{js,css}'
      }
    },
    // Configuration to be run (and then tested).
    userevvd: {
      html: {
        options: {
          formatNewPath: function(path){
            return path.replace(/^test\/dist/, 'https://cdn.domain.com');
          }
        },
        files: [
          {
            cwd: '<%= config.fixture %>/',
            expand: true,
            dest: '<%= config.dest %>',
            src: ['**/*.html']
          }
        ]
      },
      css: {
        files: {
          '<%= config.dest %>': ['<%= config.fixture %>/**/*.html']
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-filerev');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  grunt.registerTask('test', [
    'clean',
    'copy',
    'filerev',
    'userevvd',
    'nodeunit'
  ]);

};
