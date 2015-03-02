"use strict"

var path = require('path');
var eslint = require('gulp-eslint');
var assign = require('object-assign');

function ESLintTask(params) {
  this.params = params;
}

ESLintTask.displayName = "ESLintTask";

ESLintTask.getDefaults = function() {
  return {
    "parser": "babel-eslint",
    "envs": {
      "browser": true,
      "node": true
    },
    "rules": {
      "camelcase": [2],
      "strict": [2],
      "no-comma-dangle": [2],
      "quotes": [2, "double"],
      "eol-last": [0],
      "no-mixed-requires": [0],
      "no-underscore-dangle": [0]
    },
    "dirs": ["::src/**/*.js", "./api/**/*.js"],
    "format": "stylish",
    "useEslintrc": false
  }
};

ESLintTask.prototype.enqueue = function(gulp, params) {
  var LINT_RULES = [
    "rulePaths", "configFile", "reset", "useEslintrc",
    "rules", "globals", "envs" , "env"
  ];

  var options = Object.keys(params).reduce(function(memo, group) {
    if (LINT_RULES.indexOf(group) > -1) {
      memo[group] = assign({}, params[group]);
    }

    return memo;
  }, {});

  var dirs = params.dirs.map(function(dir) {
    return path.join(
      module.parent.require('path').resolve(dir),
      '**/*.js'
    );
  });

  gulp.src(dirs)
    .pipe(eslint(options))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
};

ESLintTask.prototype.generateWatcher = function(gulp, params) {
  return true;
};

module.exports = ESLintTask;
