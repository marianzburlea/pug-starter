'use strict';

import path from 'path';

const watch = ({
  gulp,
  plugins,
  args,
  config,
  browserSync
}) => {
  const dirs = config.directory;

  // Gulp watch task
  gulp.task('watch', () => {
    if (!args.production) {
      // Pug templates
      gulp.watch([
        path.join(dirs.source, '**/*.pug'),
        path.join(dirs.source, dirs.data, '**/*.json')
      ], gulp.series('pug'));

      // Sass style
      gulp.watch([
        path.join(dirs.source, '**/*.{scss,sass}'),
        path.join(dirs.source, dirs.component, '**/*.{scss,sass}')
      ], config.entry.css.inline ? gulp.series('sass', 'pug') : gulp.series('sass'));
    }
  });
};

export default watch;
