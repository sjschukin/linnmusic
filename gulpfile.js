var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync').create();
    var reload = browserSync.reload;

var themeRoot = 'web/themes/richtan/';

gulp.task('sass', function(done) {
    gulp.src(themeRoot + 'scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .on('error', sass.logError)
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(themeRoot + 'css'))
        .pipe(browserSync.reload({
            stream: true
        }));

    done();
});

gulp.task('browser-sync', function(done) {
    //watch files
    var files = [
        themeRoot + 'css/*.css',
        themeRoot + 'js/*.js',
        themeRoot + 'images/**/*',
        themeRoot + 'templates/**/*.twig'
    ];
    //initialize browsersync
    browserSync.init(files, {
        proxy: "dev.linnmusic.ru"
    });

    browserSync.watch('web/').on('change', reload);

    done();
});

gulp.task('default', gulp.series('sass', 'browser-sync'), function(done) {
    gulp.watch(themeRoot + 'scss/**/*.scss', gulp.series('sass'));

    done();
});