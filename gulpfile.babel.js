'use strict';

// GUlp is a simple platform-agnostic toolkit that helps you automate painful
// and time-consuming tasks in your workflow
import gulp from 'gulp';
import fs from 'fs';
// browser-sync - Live CSS Reload & Browser Syncing
import browserSyncLib from 'browser-sync';
// minimist - argument parser without all the fanciful decoration
import minimist from 'minimist';
// gulp-load-plugins - Loads gulp plugins from package dependencies and attaches
// them to an object of your choice.
import gulpLoadPlugins from 'gulp-load-plugins';

// Import package.json to grab and use the config property
import packageJsonData from './package.json';

import clean from './gulp/clean';
import copy from './gulp/copy';
import deploy from './gulp/deploy';
import font from './gulp/font';
import image from './gulp/image';
import pug from './gulp/pug';
import sass from './gulp/sass';
import template from './gulp/template';
import watch from './gulp/watch';

const config = Object.assign({}, packageJsonData.config);
const args = minimist(process.argv.slice(2));
const dir = config.directory;
const taskTarget = args.production ? dir.production : dir.development;

// Create a new browserSync instance
const browserSync = browserSyncLib.create();

// Load gulp plugins
const plugins = gulpLoadPlugins({
  // when set to true, the plugin will log info to console.
  // Useful for bug reporting and issue debugging
  DEBUG: false
});

// Read all files from the gulp folder and load all gulp tasks
// fs.readdirSync('./gulp')
//   .filter(fileName => /\.(js)$/i.test(fileName))
//   .map(fileName => fileName.split('.').reduce(a=>a)());
clean({ gulp, config, args, taskTarget, plugins, browserSync });
copy({ gulp, config, args, taskTarget, plugins, browserSync });
deploy({ gulp, config, args, taskTarget, plugins, browserSync });
font({ gulp, config, args, taskTarget, plugins, browserSync });
image({ gulp, config, args, taskTarget, plugins, browserSync });
pug({ gulp, config, args, taskTarget, plugins, browserSync });
sass({ gulp, config, args, taskTarget, plugins, browserSync });
template({ gulp, config, args, taskTarget, plugins, browserSync });
watch({ gulp, config, args, taskTarget, plugins, browserSync });
// Server task with watch
gulp.task('dev', gulp.series(
  'clean:development',
  'font',
  'copy',
  'image',
  'sass',
  'pug',
  'template',
  'watch'
));

// Build production ready code
gulp.task('build', gulp.series(
  'clean:production',
  'font',
  'copy',
  'image',
  'sass',
  'pug',
  'template'
));

// Default gulp task
gulp.task('default', () => {
  console.log('Default gulp task');
});
