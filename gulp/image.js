'use strict';

import path from 'path';
import pngquant from 'imagemin-pngquant';
import jpegoptim from 'imagemin-jpegoptim';
import optipng from 'imagemin-optipng';
import gifsicle from 'imagemin-gifsicle';
import svgo from 'imagemin-svgo';
import { getImageCollection } from './util/util';
import mergeStream from 'merge-stream';
import gulpConfig from './util/config';

const image = ({
  gulp,
  config,
  plugins,
  taskTarget,
  args
}) => {
  const dir = config.directory;
  const dest = path.join(taskTarget, dir.asset.replace(/\_/, ''), dir.image);
  const templateCollection = dir.templateCollection;
  const templateImagePathCollection = templateCollection.map(folderName => {
    return {
      source: path.join(
        dir.source,
        `_${folderName}`,
        gulpConfig.fileExpression.image
      ),
      dest: path.join(
        taskTarget,
        `${folderName}`
      )
    };
  });

  const assetImagePath = path.join(
    dir.source,
    dir.asset,
    dir.image,
    gulpConfig.fileExpression.image
  );

  gulp.task('image', () => {
    let gulpStreamCollection = templateImagePathCollection
      .map(({source, dest}) => getImageCollection({
        source,
        gulp,
        config,
        plugins,
        pngquant,
        jpegoptim,
        gifsicle,
        svgo,
        dest,
        optipng,
        args
      })
    );

    let assetImageCollection = getImageCollection({
      source: assetImagePath,
      gulp,
      config,
      plugins,
      pngquant,
      jpegoptim,
      gifsicle,
      svgo,
      dest,
      optipng,
      args
    });

    return mergeStream(gulpStreamCollection, assetImageCollection);
  });
};

export default image;
