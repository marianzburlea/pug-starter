'use strict';

import path from 'path';
import pngquant from 'imagemin-pngquant';
import jpegtran from 'imagemin-jpegtran';
import optipng from 'imagemin-optipng';
import gifsicle from 'imagemin-gifsicle';
import svgo from 'imagemin-svgo';

const image = ({
  gulp,
  config,
  plugins,
  taskTarget,
  args
}) => {
  const dir = config.directory;
  const dest = path.join(taskTarget, dir.asset.replace(/\_/, ''), dir.image);

  gulp.task('image', () => {
    return gulp
      .src(path.join(
        dir.source,
        dir.asset,
        dir.image,
        '**/*.{jpg,jpeg,gif,svg,png}'
      ))
      .pipe(plugins.changed(dest))
      .pipe(plugins.if(
        args.production,
        plugins.imagemin({
          progressive: true,
          optimizationLevel: 7,
          svgoPlugins: [{
            removeViewBox: false
          }],
          use: [
            pngquant({
              speed: 10
            }),
            jpegtran(), optipng(), gifsicle()
          ]
        })
      ))
      .pipe(gulp.dest(dest));
  });
};

export default image;
