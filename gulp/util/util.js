import fs from 'fs';
// foldero - will load files from the folder you specify and construct an object
// with properties corresponding to each loaded file
import foldero from 'foldero';

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
  .pipe(obj.plugins.debug())
  .pipe(obj.plugins.changed(obj.dest))
  .pipe(obj.plugins.if(
    obj.args.production,
    obj.plugins.imagemin([
      obj.plugins.imagemin.gifsicle({interlaced: true}),
      obj.jpegoptim({progressive: true, max: 85}),
      obj.plugins.imagemin.optipng({optimizationLevel: 5}),
      obj.plugins.imagemin.svgo({plugins: [{removeViewBox: true}]})
    ],{
      verbose: true
    })
  ))
  .pipe(obj.gulp.dest(obj.dest));
};

const getStaticFiles = ({staticFilePath, dest, gulp, plugins}) => {
  return gulp
    .src(staticFilePath)
    .pipe(plugins.debug())
    .pipe(plugins.changed(dest))
    .pipe(gulp.dest(dest));
};

export {
  getStaticFiles,
  getJsonData,
  getImageCollection
};
