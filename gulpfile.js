var gulp = require('gulp');
var concat = require('gulp-concat');

var paths = {
  scripts: [
    'bower_components/fabric.js/dist/fabric.min.js',
    'bower_components/jquery/dist/jquery.min.js',
    'src/*.js'
  ]
};

gulp.task('scripts', function() {
  return gulp.src(paths.scripts)
    .pipe(concat('app.js'))
    .pipe(gulp.dest('public/js/'));
});

gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
});

gulp.task('default', ['scripts', 'watch']);
