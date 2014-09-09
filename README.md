# grunt-userevvd [![Build Status](http://img.shields.io/travis/kylerush/grunt-userevvd.svg?branch=master)](https://github.com/kylerush/grunt-userevvd) [![NPM version](https://badge.fury.io/js/grunt-userevvd.svg)](http://badge.fury.io/js/grunt-userevvd)

> Replaces &lt;script&gt;, &lt;link&gt;, and &lt;img&gt; HTML tags with their rev'd version for client and edge server caching.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-userevvd --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-userevvd');
```

## The "userevvd" task

This is a companion task for [grunt-filerev](https://github.com/yeoman/grunt-filerev). You must run the `filerev` task before running the `userevvd` task.

`grunt-userevvd` is a very lightweight and fast plugin that replaces the src/href attribute value for `<script>` or `<link>` tags to their revv'd version.

The task reads the summary `grunt.filerev.summary` object that `grunt-filerev` creates. It replaces all the references to the newly revv'd files in the .html files you specify.

### Overview
In your project's Gruntfile, add a section named `userevvd` to the data object passed into `grunt.initConfig()`.

An `html` task name replaces `script` and `link` references in .html files. Currently only .html files are supported, but .css will come in the future.

You should use the [files array format](http://gruntjs.com/configuring-tasks#files-array-format).

```js
grunt.initConfig({
  userevvd: {
    html: {
      files: [
        {
          cwd: 'dist/',
          src: '**/*.html',
          expand: true,
          dest: 'dist'
        }
      ]
    },
  },
});
```

### Options

####options.formatNewPath (optional)

A function that formats the new `src` or `href` value for the `script`/`link` tag. The argument is passed a string containing the original path from the `grunt.filerev.summary` object.

####options.formatOriginalPath (optional)

A function that formats the original file path from grunt-filerev. This plugin will look for the a tag with the return value from this function to replace.

### Usage Examples

Assuming you have a directory struture like this:

```
|
+- dist
|    +- assets
|         +- js
|              +- main.js
|    +- index.html
```

The contents of dist/index.html are:

```html
<!doctype html>
<html>
  <head>
    <script src="dist/assets/js/main.js"></script>
  </head>
</html>
```

With the following Grunt configuration:

```js
grunt.initConfig({
  filerev: {
    dist: {
      src: 'dist/assets/js/**/*.js'
    }
  }
  userevvd: {
    html: {
      options: {
        formatPath: function(path){
          return path.replace(/^dist/, 'https://cdn.domain.com');
        }
      },
      files: [
        {
          cwd: 'dist/',
          expand: true,
          src: '**/*.html',
          dest: 'dist'
        }
      ]
    }
  },
});
```

grunt-filerev will add a hash to the main.js file name:

```
|
+- dist
|    +- assets
|         +- js
|              +- main.k8dj3h45.js
|    +- index.html
```

And grunt-userevvd will change the reference to main.js in dist/index.html:

```html
<!doctype html>
<html>
  <head>
    <script src="https://cdn.domain.com/assets/js/main.k8dj3h45.js"></script>
  </head>
</html>
```

If the `formatPath` option were ommitted, dist/index.html would look like this:

```html
<!doctype html>
<html>
  <head>
    <script src="dist/assets/js/main.k8dj3h45.js"></script>
  </head>
</html>
```

## Summary

Just like grunt-filerev, grunt-userevvd produces a `grunt.userevvd.summary` object containing the original path and the new path for each file. Given the example above, the `grunt.userevvd.summary` file would look like:

```json
{
  "dist/assets/js/main.js": "https://cdn.domain.com/assets/js/main.k8dj3h45.js"
}
```

Or, if you omitted the `formatPath` option:

```json
{
  "dist/assets/js/main.js": "dist/assets/js/main.k8dj3h45.js"
}
```

In other words, if you don't use the formatPath option, `grunt.userevvd.summary` is exactly the same as `grunt.filerev.summary`.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
