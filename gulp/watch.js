'use strict';

import path from 'path';
import gulpConfig from './util/config';

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

      // Template
      dir.templateCollection.map(folderName => {
        console.log(dir.templateCollection);
        console.log(path.join(dir.source, `_${folderName}`, '**/*.json'));
        gulp.watch([
          path.join(dir.source, `_${folderName}`, '**/*.json')
        ], gulp.series('template'));
      });

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
        gulpConfig.fileExpression.font
      ), gulp.series('font'));

      // Image files
      gulp.watch(path.join(
        dir.source,
        dir.asset,
        dir.image,
        gulpConfig.fileExpression.image
      ), gulp.series('image'));

      // inline.css
      gulp.watch([
        path.join(taskTarget, 'inline.css')
      ], gulp.series('pug'));

      // HTML
      gulp.watch([
        path.join(taskTarget, '**/*.html')
      ], browserSync.reload);
    }
  });
};

export default watch;
