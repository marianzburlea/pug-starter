'use strict';

import fs from 'fs';
import path from 'path';
import { getJsonData, printError } from './util/util';

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
  const inlinePath = path.join(taskTarget, 'inline.css');

  gulp.task('template', () => {
    let data = getJsonData({dataPath}) || {};

    return gulp
      // target pug files
      .src([
        path.join(dir.source, '**/*.pug'),
        // Ignore files and folders that start with "_"
        '!' + path.join(dir.source, '{**/\_*,**/\_*/**}')
      ])
      // Only deal with files that change in the pipeline
      .pipe(plugins.if(
        config.render.sourceFileChange,
        plugins.changedInPlace({ firstPass: true })
      ))
      // Render if any pug files is changed and compare
      // the output with the destination file
      .pipe(plugins.if(
        !config.render.sourceFileChange,
        plugins.changed(taskTarget)
      ))
      .pipe(plugins.plumber())
      // compile pug to html
      .pipe(plugins.pug({
        // compress if in production
        pretty: args.production ? false: true,
        // Make data available to pug
        locals: {
          config,
          // debug: true,
          data,
          taskTarget,
          inlinePath
        }
      }))
      // Check if inline.css exists and use inlineSource to inject it
      .on('error', function(error) {
        browserSync.notify(printError(error), 25000);
        console.log(error);
        reload = false;
        this.emit('end');
      })
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

export default template;
