import { exit } from 'process';
import gulp from 'gulp';

const $ = require('gulp-load-plugins')();

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
  const exitFailure = () => exit(1);
  const test = $.mocha({ require: 'babel-register' });

  gulp.src('test/**.js', { read: false })
    .pipe(test)
    .on('error', exitFailure);
};

gulp.task('default', defaultTask);
gulp.task('eslint', eslintTask);
gulp.task('htmlhint', htmlhintTask);
gulp.task('mocha', mochaTask);
gulp.task('test', ['htmlhint', 'eslint', 'mocha']);
