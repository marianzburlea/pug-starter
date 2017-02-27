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
  const dirs = config.directories;
  const entries = config.entries;
  const cssPath = [];

  if (entries.css.external) {
    cssPath.push(path.join(dirs.source, entries.cssExternal));
  }
  if (entries.css.inline) {
    cssPath.push(path.join(dirs.source, entries.cssInline));
  }

  // Compile sass
  gulp.task('sass', () => {
    gulp.src(cssPath)
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
      .pipe(gulp.dest(taskTarget));
  });
};

export default sass;
