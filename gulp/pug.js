'use strict';

import fs from 'fs';
import path from 'path';
// foldero - will load files from the folder you specify and construct an object
// with properties corresponding to each loaded file
import foldero from 'foldero';

const pug = ({
  gulp,
  taskTarget,
  config
}) => {
  const dirs = config.directories;

  gulp.task('pug', () => {
    return gulp
      .src([
        path.join(dirs.source, '**/*.pug'),
        // Ignore files and folders that start with "_"
        '!' + path.join(dirs.source, '{**/\_*,**/\_*/**}')
      ])
      .pipe(gulp.dest(path.join(taskTarget)));
  });
};

export default pug;
