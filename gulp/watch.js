'use strict';

import path from 'path';

const watch = ({
  gulp,
  plugins,
  args,
  config,
  browserSync
}) => {
  const dirs = config.directories;

  // Gulp watch task
  gulp.task('watch', () => {
    if (!args.production) {
      // Pug templates
      return gulp.watch([
        path.join(dirs.source, '**/*.pug'),
        path.join(dirs.source, dirs.data, '**/*.json')
      ], gulp.series('pug'));
    }
  });
};

export default watch;
