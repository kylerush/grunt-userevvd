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

  grunt.registerMultiTask('userevvd', 'Replaces references in HTML to JavaScript and CSS files with their revv\'d version.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      punctuation: '.',
      separator: ', '
    });

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {

      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      });

      src.forEach(function(file){

        //file is string to filepath

        var modifiedSrc,
            cheerio,
            $,
            newFile,
            tagToFind,
            newSrcValue,
            newElem;

        modifiedSrc = grunt.file.read(file);

        cheerio = require('cheerio');

        $ = cheerio.load(modifiedSrc);

        newFile = f.dest;

        if(!/\/$/.test(newFile)){
          newFile += '/';
        }

        newFile += file.replace(/^.*[\\\/]/, '');

        for(var propertyName in grunt.filerev.summary){

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

        // Handle options.
        //src += options.punctuation;

        // Write the destination file.
        grunt.file.write(newFile, $.html());

        // Print a success message.
        grunt.log.writeln('Replaced revv\'d assets in ' + newFile);

      });

    });

  });

};
