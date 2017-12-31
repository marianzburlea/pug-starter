'use strict';

import path from 'path';
import gulpConfig from './util/config';

const font = ({
  gulp,
  config,
  plugins,
  taskTarget
}) => {
  const dir = config.directory;
  const dest = path.join(taskTarget, dir.asset.replace(/\_/, ''), dir.font);

  gulp.task('font', () => {
    return gulp
      .src(path.join(
        dir.source,
        dir.asset,
        dir.font,
        gulpConfig.fileExpression.font
      ))
      .pipe(plugins.changed(dest))
      // .pipe(plugins.debug())

      // Fix for Windows 10 and gulp acting crazy
      .pipe(plugins.rename(file => {
        let dirList = file.dirname.split(path.sep);
        let destList = dest.split(path.sep);
        if (dirList.length === 1) {
          file.dirname = '';
        }

        if (file.dirname.indexOf('\\') !== -1) {
          if (dirList[0] === config.directory.source) {
            dirList.shift();
          }
  
          dirList = dirList.map(x => x.replace(/\_/, '')).filter(x => !destList.includes(x));
          file.dirname = dirList.join(path.sep);
        }
      }))
      // .pipe(plugins.debug())
      .pipe(gulp.dest(dest));
  });
};

export default font;
