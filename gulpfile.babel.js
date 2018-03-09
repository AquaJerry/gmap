import { exit } from 'process';
import gulp from 'gulp';
import webpackConfig from './webpack.config';

// Helpers
const $ = require('gulp-load-plugins')();

const exitFailure = () => exit(1);

// Tasks
const defaultTask = () => {
  // Coming soon!
};
const eslintTask = () => {
  const fail = $.eslint.failOnError();
  const lint = $.eslint({ fix: true });
  const isFixed = ({ eslint }) => eslint && eslint.fixed;
  const wd = gulp.dest('.');

  const replaceFixed = $.if(isFixed, wd);

  gulp.src(['**/*.js', '!node_modules/**'])
    .pipe(lint)
    .pipe(replaceFixed)
    .pipe(fail);
};
const htmlhintTask = () => {
  const fail = $.htmlhint.failOnError();
  const hint = $.htmlhint();

  gulp.src('src/**.html')
    .pipe(hint)
    .pipe(fail);
};
const mochaTask = () => {
  const test = $.mocha({ require: ['babel-polyfill', 'babel-register'] });

  gulp.src('test/**.js', { read: false })
    .pipe(test)
    .on('error', exitFailure);
};
const webpackTask = () => {
  // webpack(options, otherWebpack, errorHandle)
  const pack = $.webpack(webpackConfig, null, exitFailure);

  gulp.src('src/**')
    .pipe(pack);
};

gulp.task('default', defaultTask);
gulp.task('eslint', eslintTask);
gulp.task('htmlhint', htmlhintTask);
gulp.task('mocha', mochaTask);
gulp.task('test', ['htmlhint', 'eslint', 'webpack', 'mocha']);
gulp.task('webpack', webpackTask);
