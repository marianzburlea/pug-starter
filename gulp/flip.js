'use strict';

import fs from 'fs';
import path from 'path';
import {
  getJsonData,
  printError,
  fixWindows10GulpPathIssue,
  printCompile,
  logError
} from './util/util';
import { exec } from 'child_process';

const flip = ({ gulp, taskTarget, config, plugins, args, browserSync }) => {
  const dir = config.directory;
  const dataPath = path.join(dir.source, dir.data);
  const embedPath = path.join(taskTarget, 'embed.css');
  let baseUrl = '/';

  if (args.lang) {
    config.lang = args.lang;
  }
  if (args.production) {
  }

  gulp.task('flip', () => {
    // I want to rename folders, how do I do that?
    // mv current-name new-name
    const newName = new Date().toISOString().split(':').join('--')

    // check if production exists
    if (fs.existsSync(dir.production)) {
      fs.renameSync(dir.production, `${dir.production}-${newName}`)
    }

    fs.renameSync(`${dir.production}-haha`, dir.production)
    process.exit(0)
    return (
      gulp
    );
  });
};

export default flip;
