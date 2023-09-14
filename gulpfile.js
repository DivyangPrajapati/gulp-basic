const gulp 		= require('gulp');
const uglify 	= require('gulp-uglify');
//const sass 		= require('gulp-sass');
const sass 		= require('gulp-sass')(require('sass'));
const concat	= require('gulp-concat');

/*
	-- TOP LEVEL FUNCTIONS --
	gulp.task - Define tasks
	gulp.src - point to files to use
	gulp.dest - Points to folder to output
	gulp.watch - Watch files and folders for changes
*/

// Logs Message
gulp.task('message', function(done) {
	console.log('Gulp is running..');
	done();
});

// Copy All HTML files
gulp.task('copyHtml', function(done) {
	gulp.src('src/*.html')
		.pipe( gulp.dest('dest'));
	done();
});

// Minify JS
gulp.task('minify', function(done) {
	gulp.src('src/js/*.js')
		.pipe(uglify())
		.pipe( gulp.dest('dest/js'));
	done();
});

// Compile Sass
gulp.task('sass', function(done) {
	gulp.src('src/sass/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe( gulp.dest('dest/css'));

	done();
});

// Scripts Concat
gulp.task('scripts', function(done) {
	gulp.src('src/js/*.js')
		.pipe(concat('main.js'))
		.pipe(uglify())
		.pipe( gulp.dest('dest/js'));

	done();
});

//gulp.task('default', ['message', 'copyHtml', 'minify', 'sass']);
gulp.task('default', gulp.series('message', 'copyHtml', 'sass', 'scripts'));

gulp.task('watch', function() {
	gulp.watch('src/js/*.js', gulp.series('scripts'));
	gulp.watch('src/sass/*.scss', gulp.series('sass'));
	gulp.watch('src/*.html', gulp.series('copyHtml'));
});