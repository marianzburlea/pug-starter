"use strict";

import fs from "fs";
import path from "path";
import {
  getJsonData,
  printError,
  fixWindows10GulpPathIssue,
  printCompile,
  logError,
} from "./util/util";
import babel from "@rollup/plugin-babel";

import source from "vinyl-source-stream"
import buffer from "vinyl-buffer"
import rollup from "@rollup/stream"
import nodeResolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import sourcemaps from 'gulp-sourcemaps'


// *Optional* Depends on what JS features you want vs what browsers you need to support
// *Not needed* for basic ES6 module import syntax support
// var babel = require("@rollup/plugin-babel");

// Add support for require() syntax
// var commonjs = require("@rollup/plugin-commonjs");

// Add support for importing from node_modules folder like import x from 'module-name'
// var nodeResolve = require("@rollup/plugin-node-resolve");

// Cache needs to be initialized outside of the Gulp task
var cache;

const javascript = ({
  gulp,
  taskTarget,
  config,
  plugins,
  args,
  browserSync,
  baseUrl,
}) => {
  const dir = config.directory;
  const dataPath = path.join(dir.source, dir.data);
  const embedPath = path.join(taskTarget, "embed.css");

  gulp.task("javascript", () => {
    printCompile(compileMode, args);
    let data = getJsonData({ dataPath }) || {},
      reload = true;

    browserSync.sockets.emit("msg", {
      title: `<div style='font-size: 3rem; text-align-center'>Rerefshing web page</div>`,
      body: `<h1 style='color: black; font-size: 2rem'>as you've made changes <br>to your PUG file 💃</h1>`,
    });

    return (
      rollup({
        // Point to the entry file
        input: path.join(dir.source, dir.asset, "js/all.js"),

        // Apply plugins
        plugins: [babel(), commonjs(), nodeResolve()],

        // Enable source maps support
        sourcemap: true,

        // Use cache for better performance
        cache: cache,

        // Note: these options are placed at the root level in older versions of Rollup
        output: {
          // Output bundle is intended for use in browsers
          // (iife = "Immediately Invoked Function Expression")
          format: "iife",

          // Show source code when debugging in browser
          sourcemap: true,
        },
      })
        .on("bundle", function (bundle) {
          // Update cache data after every bundle is created
          cache = bundle;
        })
        // Name of the output file.
        .pipe(source("bundle.js"))
        .pipe(buffer())

        // The use of sourcemaps here might not be necessary,
        // Gulp 4 has some native sourcemap support built in
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write("."))

        // Where to send the output file
        .pipe(gulp.dest(path.join(taskTarget)))
        .on('end', () => {
          reload && browserSync.reload();
        })
    );
  });
};

export default javascript;
