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
      "radix": 1,
      "max-nested-callbacks": [2, 3],
      "no-new-wrappers": 2,
      "no-sequences": 2,
      "no-var": 2,
      "generator-star": [1, "end"],
      "max-params": [1, 3],
      "max-depth": [1, 2],
      "max-len": [2, 80, 4],
      "strict": 0,
      "no-underscore-dangle": 0,
      "no-unused-vars": 0,
      "curly": 0,
      "no-multi-spaces": 0,
      "key-spacing": 0,
      "no-return-assign": 0,
      "consistent-return": 0,
      "no-shadow": 0,
      "no-comma-dangle": 0,
      "no-use-before-define": 0,
      "no-empty": 0,
      "new-parens": 0,
      "no-cond-assign": 0
    },
    "dirs": ["::src/**/*.js", "./api/**/*.js"],
    "search": ["::src/**/*.js", "./api/**/*.js"],
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
    return module.parent.require('path').resolve(dir);
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
