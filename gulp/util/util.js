import fs from 'fs';
import path from 'path';
// foldero - will load files from the folder you specify and construct an object
// with properties corresponding to each loaded file
import foldero from 'foldero';

const printError = error => `<h1 style="color:#c00">Error</h1><pre style="text-align:left">${error.message}</pre>`

const getJsonData = obj => {
  if (fs.existsSync(obj.dataPath)) {
    // Convert directory to a JavaScript Object
    return foldero(obj.dataPath, {
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
};

const getImageCollection = obj => {
  return obj.gulp
  .src(obj.source)
  .pipe(obj.plugins.changed(obj.dest))
  .pipe(obj.plugins.if(
    obj.args.production,
    obj.plugins.imagemin([
      obj.plugins.imagemin.gifsicle({interlaced: true}),
      obj.jpegoptim({progressive: true, max: 85}),
      obj.plugins.imagemin.optipng({optimizationLevel: 5}),
      obj.plugins.imagemin.svgo({plugins: [{removeViewBox: true}]})
    ])
  ))
  // .pipe(plugins.debug())

  // Fix for Windows 10 and gulp acting crazy
  .pipe(obj.plugins.rename(file => {
    const {dest, plugins, config} = obj;
    fixWindows10GulpPathIssue({file, dest, plugins, config})
  }))
  // .pipe(plugins.debug())
  .pipe(obj.gulp.dest(obj.dest));
};

const fixWindows10GulpPathIssue = ({file, dest, plugins, config}) => {
  let dirList = file.dirname.split(path.sep);
  let destList = dest.split(path.sep);
  if (dirList.length === 1 && dirList[0] === config.directory.source) {
    file.dirname = '';
  }

  if (file.dirname.indexOf('\\') !== -1) {
    if (dirList[0] === config.directory.source) {
      dirList.shift();
    }

    dirList = dirList.map(x => x.replace(/\_/, '')).filter(x => !destList.includes(x));
    file.dirname = dirList.join(path.sep);
  }
};

const getStaticFiles = ({staticFilePath, dest, gulp, plugins, config}) => {
  return gulp
    .src(staticFilePath)
    .pipe(plugins.changed(dest))

    // Fix for Windows 10 and gulp acting crazy
    .pipe(plugins.rename(file => {
      fixWindows10GulpPathIssue({file, dest, plugins, config})
    }))

    .pipe(gulp.dest(dest));
};

export {
  getStaticFiles,
  getJsonData,
  getImageCollection,
  printError,
  fixWindows10GulpPathIssue
};
