'use strict';

import path from 'path';
import autoprefixer from 'autoprefixer';
import { printError, fixWindows10GulpPathIssue } from './util/util';

const sass = ({
  gulp,
  plugins,
  args,
  config,
  taskTarget,
  browserSync
}) => {
  const dir = config.directory;
  const { entry } = config;
  let cssPath = [];

  if (entry.css.external) {
    cssPath.push(path.join(dir.source, entry.cssExternal));
  }
  if (entry.css.embed) {
    cssPath.push(path.join(dir.source, entry.cssEmbed));
  }

  if (entry.cssModular) {
    cssPath = [
      `./${dir.source}/**/*.{scss,sass}`,
      `!./${dir.source}/**/\_*.{scss,sass}`
    ]
  }

  // Compile sass
  gulp.task('sass', () => {
    return gulp.src(cssPath)
      // Only deal with files that change in the pipeline
      .pipe(plugins.plumber())
      // .pipe(plugins.cached())
      .pipe(plugins.sourcemaps.init())
      .pipe(plugins.sass({
        outputStyle: args.production ? 'compressed' : 'expanded',
        precision: 10,
        sync: true,
        includePaths: [
          path.join(dir.source),
          path.join(dir.source, dir.component)
        ]
      }))
      .on('error', function(error) {
        plugins.sass.logError;
        browserSync.notify(printError(error), 25000);
        console.log(error);
        this.emit('end');
      })
      .pipe(plugins.postcss([
        autoprefixer({
          browsers: [
            'last 2 version',
            '> 5%',
            'safari 5',
            'ios 6',
            'android 4'
          ],
          // turn off notification for IE grid support
          grid: false
        })
      ]))

      // Fix for Windows 10 and gulp acting crazy
      .pipe(plugins.rename(file => {
        const dest = taskTarget;
        fixWindows10GulpPathIssue({file, dest, plugins, config})
      }))

      .pipe(plugins.sourcemaps.write('./'))
      .pipe(gulp.dest(taskTarget.replace(/\_/, '')))
      .pipe(browserSync.stream({match: '**/*.css'}));
  });
};

export default sass;
