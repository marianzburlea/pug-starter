'use strict';

import path from 'path';
import gulpConfig from './util/config';
import { fixWindows10GulpPathIssue } from './util/util';

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
        fixWindows10GulpPathIssue({file, dest, plugins, config})
      }))
      // .pipe(plugins.debug())
      .pipe(gulp.dest(dest));
  });
};

export default font;
