import gulp from 'gulp';

const $ = require('gulp-load-plugins')();

// TODO task default
const taskDefault = () => {};
// check and fix javascripts in all dirs except node_modules recursively
const taskEslint = () => {
  const format = $.eslint.format();
  const isFixed = ({ eslint }) => eslint && eslint.fixed;
  const lint = $.eslint({ fix: true });
  const wd = gulp.dest('.');

  const replaceFixed = $.if(isFixed, wd);

  gulp.src(['**/*.js', '!node_modules/**'])
    .pipe(lint)
    .pipe(format)
    .pipe(replaceFixed);
};
// check and report html errors in src dir recursively
const taskHtmlhint = () => {
  const hint = $.htmlhint('.htmlhintrc');
  const reporter = $.htmlhint.reporter();

  gulp.src('src/**/*.html')
    .pipe(hint)
    .pipe(reporter);
};
// run tests in test dir
const taskMocha = () => {
  const mocha = $.mocha({ require: ['babel-polyfill', 'babel-register'] });
  gulp.src('test/*.js', { read: false })
    .pipe(mocha);
};

gulp.task('default', taskDefault);
gulp.task('eslint', taskEslint);
gulp.task('htmlhint', taskHtmlhint);
gulp.task('test', ['htmlhint', 'eslint'], taskMocha);
