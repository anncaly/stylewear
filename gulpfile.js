'use strict';

const gulp         = require('gulp'),
      sass         = require('gulp-sass'),
      browserSync  = require('browser-sync'),
      autoprefixer = require('gulp-autoprefixer'),
      clean = require('gulp-clean');


gulp.task('sass', function() {
    return gulp.src('scss/*.scss')
    .pipe(sass({ outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: false}))
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.reload({stream: true}))
});

// gulp.task('html', function() {
//     return gulp.src('src/*.html')
//     .pipe(gulp.dest('build'))
//     .pipe(browserSync.reload({stream: true}))
// });

gulp.task('browser-sync', function() {
   browserSync({
     server: {
         baseDir: 'build'
      },
      notify: false
   });
});

gulp.task('clean', function() {
    return del.sync('build');
});

gulp.task('img', function() {
    return gulp.src('src/img/**/*')
    .pipe(gulp.dest('build/img'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('watch', ['browser-sync', 'sass'], function() {
    gulp.watch('src/scss/**/*.scss', ['sass']);
    //gulp.watch('src/*.html', ['html'], browserSync.reload);
    gulp.watch('src/**/*.html', browserSync.reload);
    // gulp.watch('src/*.html').on('change', browserSync.reload);
    gulp.watch('src/js/**/*.js', browserSync.reload);
});

gulp.task('build', ['clean', 'sass'], function() {
    var buildCss = gulp.src([
        'build/css/main.css',
        ])
        .pipe(gulp.dest('build/css'));
    
    var buildFonts = gulp.src('src/fonts/**/*')
        .pipe(gulp.dest('build/fonts'));
    
    var buildJs = gulp.src('src/js/**/*')
        .pipe(gulp.dest('build/js'));
    
    var buildHtml = gulp.src('src/*.html')
        .pipe(gulp.dest('build'));
}); 