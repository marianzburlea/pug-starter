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
      .pipe(gulp.dest(dest));
  });
};

export default font;
