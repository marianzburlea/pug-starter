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
  const dir = config.directory;

  // Gulp watch task
  gulp.task('watch', () => {
    if (!args.production) {
      browserSync.init({
        server: taskTarget,
        notify: false
      });

      // Pug templates
      gulp.watch([
        path.join(dir.source, '**/*.pug'),
        path.join(dir.source, dir.data, '**/*.json')
      ], gulp.series('pug'));

      // Sass style
      gulp.watch([
        path.join(dir.source, '**/*.{scss,sass}'),
        path.join(dir.source, dir.component, '**/*.{scss,sass}')
      ], gulp.series('sass'));

      // Font files
      gulp.watch(path.join(
        dir.source,
        dir.asset,
        dir.font,
        '**/*.{otf,eot,svg,ttf,woff,woff2}'
      ), gulp.series('font'));

      // Image files
      gulp.watch(path.join(
        dir.source,
        dir.asset,
        dir.font,
        '**/*.{jpg,jpeg,gif,svg,png}'
      ), gulp.series('image'));

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
