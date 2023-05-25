import fs from 'fs';
import path from 'path';
import pump from 'pump';
import {
  getJsonData,
  printError,
  fixWindows10GulpPathIssue,
  printCompile,
  logError
} from './util/util';

const pug = ({ gulp, taskTarget, config, plugins, args, browserSync, baseUrl }) => {
  console.time('pug')
  const dir = config.directory;
  const dataPath = path.join(dir.source, dir.data);
  const embedPath = path.join(taskTarget, 'embed.css');

  gulp.task('pug', done => {
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

    pump([
      gulp.src(filePathList),
      plugins.if(
        compileMode === 'current',
        plugins.changedInPlace({ firstPass: true })
      ),
      plugins.if(
        compileMode === 'all',
        plugins.changed(taskTarget)
      ),
      plugins.plumber({
        errorHandler: plugins.notify.onError({
          title: 'Error converting PUG',
          message: 'Error: <%= error.message %>'
        })
      }),
      plugins.pug({
        // compress if in production
        pretty: args.production ? false : true,
        // Make data available to pug
        locals: {
          config,
          baseUrl,
          data,
          taskTarget,
          embedPath
        }
      }),
      plugins.if(
        fs.existsSync(embedPath),
        plugins.inlineSource({
          rootpath: path.join(__dirname, '..'),
          attribute: 'embed',
        })
      ),
      plugins.rename(file => {
        const dest = taskTarget;
        fixWindows10GulpPathIssue({ file, dest, plugins, config });
      }),
      gulp.dest(path.join(taskTarget))
    ], function (err) {
      if (err) {
        browserSync.notify(printError(err), 25000);
        reload = false;
        logError(err.name, err.message);
      }
      reload && browserSync.reload();
      done();
    });
  });
  console.timeEnd('pug')
};

export default pug;
