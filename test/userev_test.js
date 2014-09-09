'use strict';

var grunt = require('grunt');
var cheerio = require('cheerio');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.userev = {

  html: function(test) {

    var matchedTag,
        $,
        revvdFile,
        tagToFind,
        filesToCheck;

    filesToCheck = ['test/dist/index.html', 'test/dist/index2.html', 'test/dist/sub-html/sub.html'];

    test.expect(Object.keys(grunt.userevvd.summary).length * filesToCheck.length);

    filesToCheck.forEach(function(file){

      $ = cheerio.load( grunt.file.read(file) );

      for(var propertyName in grunt.userevvd.summary){

        console.log('looking for: ' + grunt.userevvd.summary[propertyName]);

        revvdFile = grunt.userevvd.summary[propertyName];

        if(

          /\.js/.test(propertyName) ||
          /\.png/.test(propertyName) ||
          /\.jpg/.test(propertyName) ||
          /\.jpeg/.test(propertyName) ||
          /\.gif/.test(propertyName) ||
          /\.svg/.test(propertyName)

        ){

          tagToFind = '[src="' + revvdFile + '"]';

          test.equal($(tagToFind).attr('src'), grunt.userevvd.summary[propertyName], 'JavaScript revved tag version found.');

        } else if( /\.css/.test(propertyName) ){

          tagToFind = 'link[href="' + revvdFile + '"]';

          test.equal($(tagToFind).attr('href'), grunt.userevvd.summary[propertyName], 'CSS revved tag version found.');

        }

      }

    });

    test.done();
  }

};
