import gulp from 'gulp';
import concat from 'gulp-concat';

const
  js = {
    dest: 'public/js',
    filename: 'app.js'
  },
  assets = {
    js: [
      'bower_components/angular/angular.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-resource/angular-resource.js',
      'src/client/app/**/*.module.js',
      'src/client/app/**/*.component.js',
    ]
  };

gulp.task('js', () => {
  gulp.src(assets.js)
      .pipe(concat(js.filename))
      .pipe(gulp.dest(js.dest));

});

gulp.task('default', ['js'], () => {
  gulp.watch('src/client/app/**/*.js', ['js'])
});