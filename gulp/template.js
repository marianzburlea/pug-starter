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
    let gulpStreamCollection = templateCollection.map(folderName => {
      inlinePath = path.join(taskTarget, folderName, '../inline.css');
      let data = getJsonData({dataPath}) || {};
      let templateData = getJsonData({dataPath: path.join(dir.source, '_' + folderName)}) || {};

      return Object.keys(templateData).map(value => {
        return gulp.src(
          path.join(dir.source, '_' + folderName, 'template.pug')
        )
        // .pipe(plugins.debug())
        // compile pug to html
        .pipe(plugins.pug({
          // compress if in production
          pretty: args.production ? false: true,
          // Make data available to pug
          locals: {
            config,
            debug: true,
            data,
            template: templateData[value],
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
        .pipe(plugins.rename(
          config.render.url.htmlExtensionOn ? `${value}.html` : `${value}/index.html`
        ))
        // .pipe(plugins.debug())
        .pipe(gulp.dest(path.join(taskTarget, folderName)))
        .on('end', browserSync.reload);
      });
    });

    return mergeStream(gulpStreamCollection);
  });
};

export default template;
