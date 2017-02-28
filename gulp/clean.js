'use strict';

import path from 'path';
import del from 'del';

const clean = ({
  gulp,
  config
}) => {
  const dir = config.directory;

  // clean development project
  gulp.task('clean:development', del.bind(null, [
    path.join(dir.development)
  ]));

  // clean development project
  gulp.task('clean:production', del.bind(null, [
    path.join(dir.production)
  ]));

  // clean development project
  gulp.task('clean:ghpages', del.bind(null, [
    path.join(dir.ghpages)
  ]));
};

export default clean;
