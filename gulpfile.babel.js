import gulp from 'gulp';
import webpackConfig from './webpack.config';

// Helpers
const $ = require('gulp-load-plugins')();

// Tasks
const defaultTask = () => {
  // Coming soon!
};
const eslintTask = () => {
  const format = $.eslint.format();
  const lint = $.eslint({ fix: true });
  const isFixed = ({ eslint }) => eslint && eslint.fixed;
  const wd = gulp.dest('.');

  const replaceFixed = $.if(isFixed, wd);

  gulp.src(['**/*.js', '!node_modules/**'])
    .pipe(lint)
    .pipe(format)
    .pipe(replaceFixed);
};
const htmlhintTask = () => {
  const hint = $.htmlhint();
  const reporter = $.htmlhint.reporter();

  gulp.src('src/**.html')
    .pipe(hint)
    .pipe(reporter);
};
const mochaTask = () => {
  const mocha = $.mocha({ require: ['babel-polyfill', 'babel-register'] });
  gulp.src('test/**.js', { read: false })
    .pipe(mocha);
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
gulp.task('test', ['htmlhint', 'eslint'], mochaTask);
