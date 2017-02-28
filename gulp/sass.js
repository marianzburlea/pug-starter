'use strict';

import path from 'path';
import autoprefixer from 'autoprefixer';

const sass = ({
  gulp,
  plugins,
  args,
  config,
  taskTarget
}) => {
  const dirs = config.directory;
  const entry = config.entry;
  const cssPath = [];

  if (entry.css.external) {
    cssPath.push(path.join(dirs.source, entry.cssExternal));
  }
  if (entry.css.inline) {
    cssPath.push(path.join(dirs.source, entry.cssInline));
  }

  // Compile sass
  gulp.task('sass', () => {
    return gulp.src(cssPath)
      .pipe(plugins.plumber())
      .pipe(plugins.sourcemaps.init())
      .pipe(plugins.sass({
        outputStyle: args.production ? 'compressed' : 'expanded',
        precision: 10,
        includePaths: [
          path.join(dirs.source),
          path.join(dirs.source, dirs.component)
        ]
      }))
      .pipe(plugins.postcss([
        autoprefixer({
          browsers: [
            'last 2 version',
            '> 5%',
            'safari 5',
            'ios 6',
            'android 4'
          ]
        })
      ]))
      .pipe(plugins.sourcemaps.write('./'))
      .pipe(gulp.dest(taskTarget));
  });
};

export default sass;
