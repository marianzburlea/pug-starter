'use strict';

import fs from 'fs';
import path from 'path';
import mergeStream from 'merge-stream';
import { getJsonData } from './util/util';

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
