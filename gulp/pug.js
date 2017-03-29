'use strict';

import fs from 'fs';
import path from 'path';
import { getJsonData } from './util/util';

const pug = ({
  gulp,
  taskTarget,
  config,
  plugins,
  args,
  browserSync
}) => {
  const dir = config.directory;
  const dataPath = path.join(dir.source, dir.data);
  const inlinePath = path.join(taskTarget, 'inline.css');

  gulp.task('pug', () => {
    let data = getJsonData({dataPath}) || {};

    return gulp
      // target pug files
      .src([
        path.join(dir.source, '**/*.pug'),
        // Ignore files and folders that start with "_"
        '!' + path.join(dir.source, '{**/\_*,**/\_*/**}')
      ])
      // Only deal with files that change in the pipeline
      .pipe(plugins.changed(taskTarget))
      .pipe(plugins.plumber())
      // compile pug to html
      .pipe(plugins.pug({
        // compress if in production
        pretty: args.production ? false: true,
        // Make data available to pug
        locals: {
          config,
          debug: true,
          data,
          taskTarget,
          inlinePath
        }
      }))
      // Check if inline.css exists and use inlineSource to inject it
      .pipe(plugins.if(
        fs.existsSync(inlinePath),
        plugins.inlineSource({
          rootpath: path.join(__dirname, '..')
        })
      ))
      .pipe(gulp.dest(path.join(taskTarget)))
      .on('end', browserSync.reload);
  });
};

export default pug;
