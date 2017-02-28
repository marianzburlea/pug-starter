'use strict';

import path from 'path';
import del from 'del';

const deploy = ({
  gulp,
  config,
  plugins
}) => {
  const dir = config.directory;

  // deploy
  gulp.task('deploy', () => {
    return gulp.src(path.join(dir.production, '**/*'))
      .pipe(plugins.ghPages());
  });
};

export default deploy;
