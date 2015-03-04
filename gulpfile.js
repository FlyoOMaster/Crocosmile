var gulp = require('gulp');
var less = require('gulp-less');
var gutil = require('gulp-util');
var path = require('path');
 
gulp.task('less', function () {
  gulp.src('./public/less/**/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .on('error', gutil.log)
    .pipe(gulp.dest('./public/css'))
    
});
gulp.task('default', function() {
    gulp.start('less');
    gulp.watch('./public/less/**', function(event) {
        gulp.run('less');
    });
});