var gulp = require('gulp');
var babelify = require('babelify');
var browserify = require('browserify');
var vinylSourceStream = require('vinyl-source-stream');
var vinylBuffer = require('vinyl-buffer');
var sass = require('gulp-sass');

// Load all gulp plugins into the plugins object.
var plugins = require('gulp-load-plugins')();

var src = {
	html: 'src/**/*.html',
	vendors: 'src/vendors/**',
	scripts: {
		all: 'src/scripts/**/*.js',
		app: 'src/scripts/app.js'
	},
	partials: 'src/partials/**',
	scss: 'src/scss/styles.scss',
	styles: 'src/scss/*.scss'
};

var build = 'build/';
var out = {
	vendors: build + 'vendors/',
	scripts: {
		file: 'app.min.js',
		folder: build + 'scripts/'
	},
	partials: build + 'partials/',
	css: build + 'css/'
}

gulp.task('html', function() {
	return gulp.src(src.html)
		.pipe(gulp.dest(build))
		.pipe(plugins.connect.reload());
});

gulp.task('partials', function() {
	return gulp.src(src.partials)
		.pipe(gulp.dest(build))
		.pipe(plugins.connect.reload());
});

/* The jshint task runs jshint with ES6 support. */
gulp.task('jshint', function() {
	return gulp.src(src.scripts.all)
		.pipe(plugins.jshint({
			esnext: true // Enable ES6 support
		}))
		.pipe(plugins.jshint.reporter('jshint-stylish'));
});

gulp.task('vendors', function() {
	/* In a real project you of course would use npm or bower to manage libraries. */
	return gulp.src(src.vendors)
		.pipe(gulp.dest(out.vendors))
		.pipe(plugins.connect.reload());
});

/* Compile all script files into one output minified JS file. */
gulp.task('scripts', ['jshint'], function() {

	var sources = browserify({
		entries: src.scripts.app,
		debug: true // Build source maps
	})
	.transform(babelify);

	return sources.bundle()
		.pipe(vinylSourceStream(out.scripts.file))
		.pipe(vinylBuffer())
		.pipe(plugins.sourcemaps.init({
			loadMaps: true // Load the sourcemaps browserify already generated
		}))
		.pipe(plugins.ngAnnotate())
		.pipe(plugins.uglify())
		.pipe(plugins.sourcemaps.write('./', {
			includeContent: true
		}))
		.pipe(gulp.dest(out.scripts.folder))
		.pipe(plugins.connect.reload());

});

gulp.task('sass', function () {
  gulp.src(src.scss)
    .pipe(sass({
      includePaths: require('node-neat').includePaths
    }))
    .pipe(gulp.dest(out.css));
});

gulp.task('serve', ['build', 'watch'], function() {
	plugins.connect.server({
		root: build,
		port: 4242,
		livereload: true,
		fallback: build + 'index.html'
	});
});

gulp.task('watch', function() {
	gulp.watch(src.vendors, ['vendors']);
	gulp.watch(src.styles, ['sass']);
	gulp.watch(src.html, ['html']);
	gulp.watch(src.scripts.all, ['scripts']);
})

gulp.task('build', ['scripts', 'sass', 'html', 'partials', 'vendors']);
gulp.task('default', ['serve']);
