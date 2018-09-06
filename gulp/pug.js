'use strict';

import fs from 'fs';
import path from 'path';
import url from 'url'
import { getJsonData, printError, fixWindows10GulpPathIssue } from './util/util';

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
  const embedPath = path.join(taskTarget, 'embed.css');
  let baseUrl = '';
  if (args.lang) {
    config.lang = args.lang;
  }
  if (args.production) {
    if (config.deployToGithubIo) {
      // get the part after github.com
      const path = url.parse(config.githubUrl).pathname.split('/');
      // extract the authors, your GitHub username
      const repository = path[2].split('.').reduce(a=>a);
      // construct the link to github.io used to access the project
      // when it's deployed on github
      baseUrl = `/${repository}`;
    } else {
      baseUrl = config.customUrl;
    }
  }

  console.log(baseUrl)
  gulp.task('pug', () => {
    let data = getJsonData({dataPath}) || {},
        reload = true;

    return gulp
      // target pug files
      .src([
        path.join(dir.source, '**/*.pug'),
        // Ignore files and folders that start with "_"
        '!' + path.join(dir.source, '{**/\_*,**/\_*/**}')
      ])
      // .pipe(plugins.debug())
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
          baseUrl,
          // debug: true,
          data,
          taskTarget,
          embedPath
        }
      }))
      .on('error', function(error) {
        browserSync.notify(printError(error), 25000);
        console.log(error);
        reload = false;
        this.emit('end');
      })
      // Check if embed.css exists and use inlineSource to inject it
      .pipe(plugins.if(
        fs.existsSync(embedPath),
        plugins.inlineSource({
          rootpath: path.join(__dirname, '..')
        })
      ))
      // Fix for Windows 10 and gulp acting crazy
      .pipe(plugins.rename(file => {
        const dest = taskTarget;
        fixWindows10GulpPathIssue({file, dest, plugins, config});
      }))
      .pipe(gulp.dest(path.join(taskTarget)))
      .on('end', () => {
        reload && browserSync.reload();
      });
  });
};

export default pug;
