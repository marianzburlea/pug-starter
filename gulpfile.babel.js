'use strict';

// GUlp is a simple platform-agnostic toolkit that helps you automate painful
// and time-consuming tasks in your workflow
import gulp from 'gulp';
import fs from 'fs';
import wrench from 'wrench';

// Read all files from the gulp folder and load all gulp tasks
wrench.readdirSyncRecursive('./gulp')
  // Filter the file collection to only allow JavaScript files
  .filter(fileName => /\.(js)$/i.test(fileName))
  .map(fileName => require(`./gulp/${fileName}`)({gulp}));

// Default gulp task
gulp.task('default', () => {
  console.log('Default gulp task');
});
