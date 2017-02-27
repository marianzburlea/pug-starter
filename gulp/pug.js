'use strict';

import fs from 'fs';
import path from 'path';
// foldero - will load files from the folder you specify and construct an object
// with properties corresponding to each loaded file
import foldero from 'foldero';

const pug = ({
  gulp,
  taskTarget,
  config,
  plugins,
  args
}) => {
  const dirs = config.directories;
  const dataPath = path.join(dirs.source, dirs.data);

  gulp.task('pug', () => {
    let siteData = {};
    if (fs.existsSync(dataPath)) {
      // Convert directory to a JavaScript Object
      siteData = foldero(dataPath, {
        recurse: true,
        whitelist: '(.*/)*.json$',
        loader: file => {
          let json = {};
          try {
            json = JSON.parse(fs.readFileSync(file, 'utf8'));
          }
          catch (e) {
            console.log(`Error parsing data file: ${file}`);
            console.log(e);
          }

          return json;
        }
      });
    }

    return gulp
      // target pug files
      .src([
        path.join(dirs.source, '**/*.pug'),
        // Ignore files and folders that start with "_"
        '!' + path.join(dirs.source, '{**/\_*,**/\_*/**}')
      ])
      // Only deal with files that change in the pipeline
      .pipe(plugins.changed(taskTarget))
      .pipe(plugins.plumber())
      // compile pug to html
      .pipe(plugins.pug({
        // compress if in production
        pretty: args.production ? false: true,
        // Make data available to pug
        locals: {
          config,
          debug: true,
          site: {
            data: siteData
          },
          taskTarget
        }
      }))
      .pipe(gulp.dest(path.join(taskTarget)));
  });
};

export default pug;
