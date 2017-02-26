import gulp from 'gulp';
import concat from 'gulp-concat';
import sourcemaps from 'gulp-sourcemaps';
import templateCache from 'gulp-angular-templatecache';

const
  app = 'src/client/app',
  js = {
    dest: 'public/js',
    filename: 'app.js'
  },
  assets = {
    js: [
      'bower_components/angular/angular.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-resource/angular-resource.js',
      `${app}/**/*.module.js`,
      `${app}/app.config.js`,
      `${app}/**/*.service.js`,
      `${app}/**/*.component.js`,
    ]
  };

gulp.task('js', () => {
  return gulp.src(assets.js)
    .pipe(sourcemaps.init())
    .pipe(concat(js.filename))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(js.dest));
});

gulp.task('templates', function () {
  return gulp.src(`${app}/**/*.html`)
    .pipe(templateCache('template.service.js', { 
      module: 'core.template'
    }))
    .pipe(gulp.dest(`${app}/core/template`));
});

gulp.task('default', ['templates', 'js'], () => {
  gulp.watch(`${app}/**/*.js`, ['js']);
  gulp.watch(`${app}/**/*.html`, ['templates']);
});
