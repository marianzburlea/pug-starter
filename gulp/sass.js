'use strict';

import path from 'path';
import autoprefixer from 'autoprefixer';
import { printError, fixWindows10GulpPathIssue, printCompile } from './util/util';

const sass = ({
  gulp,
  plugins,
  args,
  config,
  taskTarget,
  browserSync,
  baseUrl
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
    printCompile(compileMode, args);
    return gulp.src(cssPath)
      // Only deal with files that change in the pipeline
      .pipe(plugins.plumber({
        errorHandler: plugins.notify.onError({
          title: 'Error converting SASS',
          message: 'Error: <%= error.message %>'
        })
      }
      ))
      // .pipe(plugins.cached())
      .pipe(plugins.sassVariables({
        $baseUrl: baseUrl
      }))
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
      // .pipe(plugins.notify({
      //   title: 'Pug Starter - CodeTap',
      //   message: 'Converting (sass|scss) into beautiful CSS'
      // }))
      .on('error', function (error) {
        plugins.sass.logError;
        browserSync.notify(printError(error), 25000);
        console.log(error);
        this.emit('end');
      })
      .pipe(plugins.postcss([
        autoprefixer({
          // turn off notification for IE grid support
          grid: false
        })
      ]))

      // Fix for Windows 10 and gulp acting crazy
      .pipe(plugins.rename(file => {
        const dest = taskTarget;
        fixWindows10GulpPathIssue({ file, dest, plugins, config })
      }))

      .pipe(plugins.sourcemaps.write('./'))
      .pipe(gulp.dest(taskTarget.replace(/\_/, '')))
      .pipe(browserSync.stream({ match: '**/*.css' }));
  });
};

export default sass;
