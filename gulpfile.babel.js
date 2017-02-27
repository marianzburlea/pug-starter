'use strict';

// GUlp is a simple platform-agnostic toolkit that helps you automate painful
// and time-consuming tasks in your workflow
import gulp from 'gulp';
import fs from 'fs';
// wrench - Recursive filesystem (and other) operations that Node should have
import wrench from 'wrench';
// minimist - argument parser without all the fanciful decoration
import minimist from 'minimist';
// gulp-load-plugins - Loads gulp plugins from package dependencies and attaches
// them to an object of your choice.
import gulpLoadPlugins from 'gulp-load-plugins';

// Import package.json to grab and use the config property
import packageJsonData from './package.json';

const config = Object.assign({}, packageJsonData.config);
const args = minimist(process.argv.slice(2));
const dirs = config.directories;
const taskTarget = args.production ? dirs.production : dirs.development;

// Load gulp plugins
const plugins = gulpLoadPlugins({
  // when set to true, the plugin will log info to console.
  // Useful for bug reporting and issue debugging
  DEBUG: false
});

// Read all files from the gulp folder and load all gulp tasks
wrench.readdirSyncRecursive('./gulp')
  // Filter the file collection to only allow JavaScript files
  .filter(fileName => /\.(js)$/i.test(fileName))
  .map(fileName => require(`./gulp/${fileName}`)({
    gulp,
    config,
    args,
    taskTarget,
    plugins
  }));

// Default gulp task
gulp.task('default', () => {
  console.log('Default gulp task');
});
