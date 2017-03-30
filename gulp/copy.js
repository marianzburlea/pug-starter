'use strict';

// This file "copy.js" was created as a copy of "font.js"
// and updated to copy files like doc and docx (documents)

import path from 'path';
import gulpConfig from './util/config';
import { getStaticFiles } from './util/util';

const copy = ({
  gulp,
  config,
  plugins,
  taskTarget
}) => {
  const dir = config.directory;
  const dest = path.join(taskTarget, dir.asset.replace(/\_/, ''));

  gulp.task('copy', () => {
    const staticFilePath = path.join(
      dir.source,
      dir.asset,
      gulpConfig.fileExpression.copy
    );

    return getStaticFiles({
      gulp,
      staticFilePath,
      dest,
      plugins
    });
  });
};

export default copy;
