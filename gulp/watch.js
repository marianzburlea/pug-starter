'use strict';

import path from 'path';

const watch = ({
  gulp,
  plugins,
  args,
  config,
  browserSync,
  taskTarget
}) => {
  const dirs = config.directory;

  // Gulp watch task
  gulp.task('watch', () => {
    if (!args.production) {
      browserSync.init({
        server: taskTarget
      });

      // Pug templates
      gulp.watch([
        path.join(dirs.source, '**/*.pug'),
        path.join(dirs.source, dirs.data, '**/*.json')
      ], gulp.series('pug'));

      // Sass style
      gulp.watch([
        path.join(dirs.source, '**/*.{scss,sass}'),
        path.join(dirs.source, dirs.component, '**/*.{scss,sass}')
      ], gulp.series('sass'));

      // inline.css
      gulp.watch([
        path.join(taskTarget, 'inline.css')
      ], gulp.series('pug'));

      // HTML
      gulp.watch([
        path.join(taskTarget, '**/*.html')
      ], browserSync.reload);
      // ], config.entry.css.inline ? gulp.series('sass', 'pug') : gulp.series('sass'));
    }
  });
};

export default watch;
