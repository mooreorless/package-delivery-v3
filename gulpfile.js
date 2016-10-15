var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify  = require('gulp-uglify');

gulp.task('scripts', function() {
  return gulp.src(['./client/**/*.js', '!./client/**/*.test.js', '!./client/app.min.js'])
		.pipe(concat('./app.min.js'))
		.pipe(uglify({ mangle: true })).on('error', function (err) {
		  console.log(err);
	  })
		.pipe(gulp.dest('client'))
});

gulp.task('default', ['scripts']);