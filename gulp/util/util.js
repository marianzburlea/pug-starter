import fs from 'fs';
import path from 'path';
// foldero - will load files from the folder you specify and construct an object
// with properties corresponding to each loaded file
import foldero from 'foldero';
import jsYaml from 'js-yaml';
import chalk from 'chalk';
import url from 'url';

export const printCompile = (value, args) => {
  // console.clear();
  args && !args.production && console.log(chalk.yellow('You are currently compiling ') + chalk.inverse(value));
};

export const logError = (name, message) => {
  console.clear();
  console.log(chalk.blue.bold('Error name: ') + chalk.red(name));
  console.log(chalk.blue.bold('Error message:'));
  console.log(chalk.inverse(message));
};

const printError = ({ message } = {}) =>
  `<h1 style='color:#c00'>Error</h1><pre style='text-align:left'>${
    message
  }</pre>`;

const getJsonData = obj => {
  if (fs.existsSync(obj.dataPath)) {
    // Convert directory to a JavaScript Object
    return foldero(obj.dataPath, {
      recurse: true,
      // prettier-ignore
      whitelist: '(.*/)*.+\.(json|ya?ml)$',
      loader: file => {
        let json = {};

        try {
          if (path.extname(file).match(/^.ya?ml$/)) {
            json = jsYaml.safeLoad(fs.readFileSync(file, 'utf8'));
          } 
          else {
            json = JSON.parse(fs.readFileSync(file, 'utf8'));
          }
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

const getBaseUrl = (args, config) => {
  let baseUrl = '/';
  if (args.lang) {
    config.lang = args.lang;
  }
  if (args.production) {
    if (config.deployToGithubIo) {
      // get the part after github.com
      const path = url.parse(config.githubUrl).pathname.split('/');
      // extract the authors, your GitHub username
      const repository = path[2].split('.').reduce(a => a);
      // construct the link to github.io used to access the project
      // when it's deployed on github
      baseUrl = `/${repository}/`;
    }
    else {
      baseUrl = `${config.customUrl}/`;
    }
  }
  return baseUrl;
}

const getImageCollection = obj => {
  return (
    obj.gulp
      .src(obj.source)
      .pipe(obj.plugins.changed(obj.dest))
      .pipe(
        obj.plugins.if(
          obj.args.production,
          obj.plugins.imagemin([
            obj.plugins.imagemin.gifsicle({ interlaced: true }),
            obj.jpegtran({ progressive: true, max: 85 }),
            obj.plugins.imagemin.optipng({ optimizationLevel: 5 }),
            obj.plugins.imagemin.svgo({ plugins: [{ removeViewBox: true }] })
          ])
        )
      )
      // .pipe(plugins.debug())

      // Fix for Windows 10 and gulp acting crazy
      .pipe(
        obj.plugins.rename(file => {
          const { dest, plugins, config } = obj;
          fixWindows10GulpPathIssue({ file, dest, plugins, config });
        })
      )
      // .pipe(plugins.debug())
      .pipe(obj.gulp.dest(obj.dest))
  );
};

const fixWindows10GulpPathIssue = ({ file, dest, plugins, config }) => {
  let dirList = file.dirname.split(path.sep);
  let destList = dest.split(path.sep);
  if (dirList.length === 1 && dirList[0] === config.directory.source) {
    file.dirname = '';
  }

  if (file.dirname.indexOf('\\') !== -1) {
    if (dirList[0] === config.directory.source) {
      dirList.shift();
    }

    dirList = dirList
      .map(x => x.replace(/\_/, ''))
      .filter(x => !destList.includes(x));
    file.dirname = dirList.join(path.sep);
  }
};

const getStaticFiles = ({ staticFilePath, dest, gulp, plugins, config }) => {
  return (
    gulp
      .src(staticFilePath)
      .pipe(plugins.changed(dest))

      // Fix for Windows 10 and gulp acting crazy
      .pipe(
        plugins.rename(file => {
          fixWindows10GulpPathIssue({ file, dest, plugins, config });
        })
      )

      .pipe(gulp.dest(dest))
  );
};

export {
  getStaticFiles,
  getJsonData,
  getImageCollection,
  printError,
  fixWindows10GulpPathIssue,
  getBaseUrl
};
