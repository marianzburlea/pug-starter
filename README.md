# Pug starter
## YouTube video tutorials

To help you out even more I've put together some YouTube tutorials:

* Install nodejs, gulp v4, git and github: https://youtu.be/A-iTEtt6SN8
* How to make a website for free in 3 easy steps 2017 - CodeTap: https://youtu.be/YBK5ZyXHumE
* The nightmare is finally over! HTML5 tutorial on how to build a webpage layout 2017 - CodeTap https://youtu.be/DdYC36N9z0E
* Build HTML5 website pain free tutorial for beginners 2017 - CodeTap https://youtu.be/qCyokdeZ6jI
  

Starter package for pug (former jade) template based projects.

***Note***: an boolean option **config.render.sourceFileChange** has been added to the *package.json*. The behaviour differs based on the value:
1. **true** - it renders if the source file (pug file) has been changed; This has a much much greater speed when rendering compared to the other option however it's only relevant if you make change to the current file watched by PUG. If you make a change to a file that's extended and resides in a path that contains "_", like a layout one, the change won't be reflected.
2. **false** - it renders if any pug file has been changed and compares the output with the destination file (the HTML generated now with the previous generated HTML). This can be slower when the number of files increases.

## Prerequisites
The project requires NodeJS v.4+ and gulp v4+

To install NodeJS visit [nodejs download page](https://nodejs.org/en/download/)
### Install gulp v4 globally
```bash
$ npm i -g gulp-cli
```
#### If you already have gulp v3 or lower installed
```bash
$ npm rm -g gulp
$ npm i -g gulp-cli
```
To verify what version you have installed globally, you can run the below command (and should see a similar output)
```bash
$ gulp -v
CLI version 1.2.1
```
### Install gulp 4 locally
Once globally installed, gulp v4 will then need to be installed on a per-project basis.
```bash
$ npm rm -D gulp
$ npm i -D gulpjs/gulp.git#4.0
```
## Table of contents
* [Installation](#installation)
* [Usage](#usage)
* [Style](#style)

## Installation
**BEFORE YOU INSTALL:** please read the [prerequisites](#prerequisites)
```bash
$ npm i
```
or
```bash
$ npm install
```
## Usage
To run the project in development mode and open a local server that synchronizes across multiple devices use:
```bash
npm start
```
or
```bash
npm run dev
```
To build the project for production use:
```bash
npm run prod
```
To automatically deploy your project to GitHub pages and make it available at https://[your-username].github.io/[your-project-name] use:
```bash
npm run deploy
```
## Style

The project supports both inline and external style sheets. You can have none, one or the other, or both of them.

### Single page application style
When you're building a single page app or website, there is no point in having the style sheets loaded from an external file and I'll explain why: the point of loading external style sheets is to allow the browser to cache those files and once you visit another web page of the same website, instead of making another request(s) for the style sheet file(s) to the server and having to download them, if there is no change, the browser will load them from the local drive. In a single page, there is no other page to go to therefore the external file technique doesn't apply.
### Multi page application style
In this scenario you can have either both inline and external or just external. The most common scenario is to have only one external style sheet file to be loaded and most of the time that's just fine.

If you want to improve your SEO and user experience even further, I strongly recommend to use a combination of both inline and external. The inline style sheet should only contain the minimum amount of styles for the initial visible part of the page to render. The rest of the styles can be put in the external CSS file.
