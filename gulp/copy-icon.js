'use strict';

// This file "copy.js" was created as a copy of "font.js"
// and updated to copy files like doc and docx (documents)

import path from 'path';
import gulpConfig from './util/config';
import { getStaticFiles } from './util/util';

const copyIcon = ({
  gulp,
  config,
  plugins,
  taskTarget
}) => {
  const dir = config.directory;
  const dest = path.join(taskTarget);

  gulp.task('copyIcon', () => {
    const staticFilePath = path.join(
      dir.source,
      gulpConfig.fileExpression.ico
    );

    return getStaticFiles({
      gulp,
      staticFilePath,
      config,
      dest,
      plugins
    });
  });
};

export default copyIcon;
