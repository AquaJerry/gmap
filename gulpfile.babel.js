import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import runSequence from 'run-sequence';

const $ = gulpLoadPlugins();

const defaultTask = () => {
  // Coming soon!
};
const eslintTask = () => {
  const [fail, format, lint] = (({ eslint }) => [
    eslint.failOnError(),
    eslint.format(),
    eslint({ fix: true }),
  ])($);
  const isFixed = ({ eslint }) => eslint && eslint.fixed;
  const myIf = $.if;
  const wd = gulp.dest('.');

  const replaceFixed = myIf(isFixed, wd);

  gulp.src(['*.js', '{src,test}/**.js', '!node_modules/**'])
    .pipe(lint)
    .pipe(format)
    .pipe(replaceFixed)
    .pipe(fail);
};
const htmlhintTask = () => {
  const hint = $.htmlhint();
  gulp.src('src/**.html')
    .pipe(hint);
};
const mochaTask = () => {
  const { mocha } = $;
  const test = mocha();
  gulp.src('test/**.js', { read: false })
    .pipe(test);
};
const testTask = (cb) => {
  runSequence(
    ['htmlhint', 'eslint'],
    'mocha',
    cb,
  );
};

gulp.task('default', defaultTask);
gulp.task('eslint', eslintTask);
gulp.task('htmlhint', htmlhintTask);
gulp.task('mocha', mochaTask);
gulp.task('test', testTask);
