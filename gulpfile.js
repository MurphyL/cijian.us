var fs = require('fs'),
	gulp = require('gulp');

gulp.task('clean', function() {

});

gulp.task('compile', function() {
    gulp.src('node_modules/vue/dist/vue.min.js')
        .pipe(gulp.dest('vendors/lib'));
});

gulp.task('default', ['compile']);