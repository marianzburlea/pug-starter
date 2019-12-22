'use strict';

import fs from 'fs';
import path from 'path';
import {
  getJsonData,
  printError,
  fixWindows10GulpPathIssue,
  printCompile,
  logError
} from './util/util';

const pug = ({ gulp, taskTarget, config, plugins, args, browserSync, baseUrl }) => {
  const dir = config.directory;
  const dataPath = path.join(dir.source, dir.data);
  const embedPath = path.join(taskTarget, 'embed.css');

  gulp.task('pug', () => {
    printCompile(compileMode, args);
    let data = getJsonData({ dataPath }) || {},
      reload = true;

    browserSync.sockets.emit('msg', {
      title: `<div style='font-size: 3rem; text-align-center'>Rerefshing web page</div>`,
      body: `<h1 style='color: black; font-size: 2rem'>as you've made changes <br>to your PUG file 💃</h1>`
    });

    const filePathList = [
      path.join(dir.source, '**/*.pug'),
    ]
    // Ignore files and folders that start with '_'
    if (!config.render.allPugFiles) {
      filePathList.push('!' + path.join(dir.source, '{**/_*,**/_*/**}'))
    }

    return (
      gulp
        // target pug files
        .src(filePathList)
        // .pipe(plugins.debug())
        // Only deal with files that change in the pipeline
        .pipe(
          plugins.if(
            compileMode === 'current',
            plugins.changedInPlace({ firstPass: true })
          )
        )
        // Render if any pug files is changed and compare
        // the output with the destination file
        .pipe(
          plugins.if(
            compileMode === 'all',
            plugins.changed(taskTarget)
          )
        )
        .pipe(plugins.plumber({
          errorHandler: plugins.notify.onError({
            title: 'Error converting PUG',
            message: 'Error: <%= error.message %>'
          })
        }
        ))
        // compile pug to html
        .pipe(
          plugins.pug({
            // compress if in production
            pretty: args.production ? false : true,
            // Make data available to pug
            locals: {
              config,
              baseUrl,
              // debug: true,
              data,
              taskTarget,
              embedPath
            }
          })
        )
        // .pipe(plugins.notify({
        //   title: 'Pug Starter - CodeTap',
        //   message: 'Converting PUG into beautiful HTML'
        // }))
        .on('error', function (error) {
          browserSync.notify(printError(error), 25000);
          reload = false;
          this.emit('end');
          logError(error.name, error.message);
        })
        // Check if embed.css exists and use inlineSource to inject it
        .pipe(
          plugins.if(
            fs.existsSync(embedPath),
            plugins.inlineSource({
              rootpath: path.join(__dirname, '..'),
              attribute: 'embed',
            })
          )
        )
        // Fix for Windows 10 and gulp acting crazy
        .pipe(
          plugins.rename(file => {
            const dest = taskTarget;
            fixWindows10GulpPathIssue({ file, dest, plugins, config });
          })
        )
        .pipe(gulp.dest(path.join(taskTarget)))
        .on('end', () => {
          reload && browserSync.reload();
        })
    );
  });
};

export default pug;


