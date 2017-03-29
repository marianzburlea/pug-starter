'use strict';

import fs from 'fs';
import path from 'path';
import mergeStream from 'merge-stream';
// foldero - will load files from the folder you specify and construct an object
// with properties corresponding to each loaded file
import foldero from 'foldero';

const template = ({
  gulp,
  taskTarget,
  config,
  plugins,
  args,
  browserSync
}) => {
  const dir = config.directory;
  const dataPath = path.join(dir.source, dir.data);
  const templateCollection = dir.templateCollection;
  let inlinePath;

  gulp.task('template', () => {
    console.log(template);
    return mergeStream(
      gulp
        .src([
          path.join(dir.source, '**/*.html')
        ]),
      gulp
        .src([
          path.join(dir.source, '**/*.html')
        ])
    )
      .pipe(plugins.debug())
      .pipe(gulp.dest(taskTarget));
  });
};

export default template;
