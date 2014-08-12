/*
 * grunt-userev
 * https://github.com/kylerush/grunt-userev
 *
 * Copyright (c) 2014 Kyle Rush
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('userev', 'Replaces references in HTML to JavaScript and CSS files with their revv\'d version.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      punctuation: '.',
      separator: ', '
    });

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        // Read file source.
        return grunt.file.read(filepath);
      }).join(grunt.util.normalizelf(options.separator));

      //grunt.log.writeln('src: ' + src);
      //grunt.log.writeln('summary: ' + grunt.filerev.summary);
      var modifiedSrc = src,
          fs = require('fs'),
          cheerio = require('cheerio'),
          $ = cheerio.load(modifiedSrc);

      for(var propertyName in grunt.filerev.summary){

        var tagToFind,
            newSrcValue,
            newElem;

        newSrcValue = grunt.filerev.summary[propertyName];

        if( /\.js/.test(propertyName) ){

          tagToFind = 'script[src="' + propertyName + '"]';

          newElem = $(tagToFind).attr('src', newSrcValue);

          $(tagToFind).replaceWith( newElem );

        } else if( /\.css/.test(propertyName) ){

          tagToFind = 'link[href="' + propertyName + '"]'

          newElem = $(tagToFind).attr('href', newSrcValue);

          $(tagToFind).replaceWith( newElem );

        }

      }

      //grunt.log.writeln($.html());

      grunt.log.writeln(f.dest);

      // Handle options.
      //src += options.punctuation;

      // Write the destination file.
      grunt.file.write(f.dest, $.html(), {
        encoding: 'utf-8'
      });

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });

};
