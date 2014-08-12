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

    test.expect(Object.keys(grunt.filerev.summary).length);

    var matchedTag,
        $,
        revvdFile,
        tagToFind;

    $ = cheerio.load( grunt.file.read('test/dist/index.html') );

    for(var propertyName in grunt.filerev.summary){

      console.log('looking for: ' + grunt.filerev.summary[propertyName]);

      revvdFile = grunt.filerev.summary[propertyName];

      if( /\.js/.test(propertyName) ){

        tagToFind = 'script[src="' + revvdFile + '"]';

        test.equal($(tagToFind).attr('src'), grunt.filerev.summary[propertyName], 'JavaScript revved tag version found.');

      } else if( /\.css/.test(propertyName) ){

        tagToFind = 'link[href="' + revvdFile + '"]';

        test.equal($(tagToFind).attr('href'), grunt.filerev.summary[propertyName], 'CSS revved tag version found.');

      }

    }

    test.done();
  }

};
