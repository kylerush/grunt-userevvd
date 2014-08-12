# grunt-userev

> Replaces <script> and <link> HTML tags with their revv'd version.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-userev --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-userev');
```

## The "userev" task

This is a companion task for [grunt-filerev](https://github.com/yeoman/grunt-filerev). You must run the `filerev` task before running the `userev` task.

The task reads the summary `grunt.filerev.summary` object that grunt-filerev creates. It replaces all the references to the files that grunt-filerev replaced in the HTML files you specify.

### Overview
In your project's Gruntfile, add a section named `userev` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  userev: {
    html: {
      files: {
        'dist': ['dist/**/*.html']
      }
    },
  },
});
```

### Options

There are no options.

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

The contents of idst/index.html are:

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
  userev: {
    files: {
      'dist': ['dist/**/*.html'],
    },
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

And grunt-userev will change the reference to main.js in dist/index.html:

```html
<!doctype html>
<html>
  <head>
    <script src="dist/assets/js/main.k8dj3h45.js"></script>
  </head>
</html>
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
