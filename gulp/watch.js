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
        // notify: false
      });
      
      // Pug templates
      gulp.watch([
        `./${dir.source}/**/*.pug`,
        `./${dir.source}/${dir.data}/**/*.json`,
      ], gulp.series('pug'));

      // Template
      dir.templateCollection.map(folderName => {
        gulp.watch([
          `./${dir.source}/_${folderName}/**/*.json`,
          `./${dir.source}/_${folderName}/**/template.pug`,
          `./${dir.source}/${dir.layout}/**/*.pug`,
          `./${dir.source}/${dir.component}/mixin/**/*.pug`,
        ], gulp.series('template'));
      });

      // Sass style
      gulp.watch([
        `./${dir.source}/**/*.{scss,sass}`,
        `./${dir.source}/${dir.component}/**/*.{scss,sass}`,
      ], gulp.series('sass'));

      // Font files
      gulp.watch(
        `./${dir.source}/${dir.asset}/${dir.font}/{${gulpConfig.fileExpression.font}}`,
        gulp.series('font')
      );

      // Image files
      gulp.watch(
        `./${dir.source}/${dir.asset}/${dir.font}/{${gulpConfig.fileExpression.image}}`,
        gulp.series('image')
      );

      // embed.css
      gulp.watch([
        `./${taskTarget}/embed.css`,
      ], gulp.series('pug'));

      // HTML
      gulp.watch([
        `./${taskTarget}/**/*.html`,
      ], browserSync.reload);
    }
  });
};

export default watch;
