'use strict';

import path from 'path';
import del from 'del';

const clean = ({
  gulp,
  config
}) => {
  const dirs = config.directories;

  // clean development project
  gulp.task('clean:development', del.bind(null, [
    path.join(dirs.development)
  ]));

  // clean development project
  gulp.task('clean:production', del.bind(null, [
    path.join(dirs.production)
  ]));

  // clean development project
  gulp.task('clean:ghpages', del.bind(null, [
    path.join(dirs.ghpages)
  ]));
};

export default clean;
