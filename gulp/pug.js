'use strict';

import fs from 'fs';
import path from 'path';
// foldero - will load files from the folder you specify and construct an object
// with properties corresponding to each loaded file
import foldero from 'foldero';

const pug = ({
  gulp,
  taskTarget,
  config,
  plugins,
  args
}) => {
  const dirs = config.directories;

  gulp.task('pug', () => {
    return gulp
      // target pug files
      .src([
        path.join(dirs.source, '**/*.pug'),
        // Ignore files and folders that start with "_"
        '!' + path.join(dirs.source, '{**/\_*,**/\_*/**}')
      ])
      // compile pug to html
      .pipe(plugins.pug({
        pretty: args.production ? false: true
      }))
      .pipe(gulp.dest(path.join(taskTarget)));
  });
};

export default pug;
