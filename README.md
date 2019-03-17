![](https://github.com/marianzburlea/pug-starter/blob/995a63f1f10c3ec7112941e6c77a95330557ef16/gulp/arrow-flashing.gif) ![](https://github.com/marianzburlea/pug-starter/blob/995a63f1f10c3ec7112941e6c77a95330557ef16/gulp/arrow-flashing.gif) ![](https://github.com/marianzburlea/pug-starter/blob/995a63f1f10c3ec7112941e6c77a95330557ef16/gulp/arrow-flashing.gif)

# Pug starter

## Table of contents

- [YouTube video tutorials](#youtube-video-tutorials)
- [Live projects built with pug-starter](#live-projects-built-with-pug-starter)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Style](#style)

## **baseUrl**

add **_modularCss_** support. When enabled in the config of `package.json` it will convert all SCSS/SASS files to its correspondent CSS path.

add **_baseurl_** support which can be configured for GitHub.io and custom domain. Check _package.json_ config section for

- _deployToGithubIo_ - (true|false) by default it is set to _true_ and will affect the value of _baseUrl_ when you want to deploy to GitHub.io; You want to set it to _false_ if you want to use _customUrl_ as the value of _baseUrl_
- _customUrl_ - if you want baseUrl to have a value like http://my-project.codetap.io or any other one;
- _githubUrl_ - if you want baseUrl to have a value like http://github.com/marianzburlea/pug-starter.git or any other one;

In the end you can use _baseUrl_ to prefix your paths like:

```
link(rel="stylesheet", href=`${baseUrl}/style.css`)
```

or

```
a(
  title="Is it possible?"
  target="_blank"
  href=`${baseUrl}/article/nice-weather`
)
```

or

```
img(alt="Awesome dog" width="100" href=`${baseUrl}/image/cool-dog.jpg`)
```

## YouTube video tutorials

To help you out even more I've put together some YouTube tutorials:

- Install nodejs, git and github

[![Install nodejs, git and github](http://img.youtube.com/vi/A-iTEtt6SN8/0.jpg)](http://www.youtube.com/watch?v=A-iTEtt6SN8)

- How to make a website for free in 3 easy steps 2017

[![How to make a website for free in 3 easy steps 2017 - CodeTap](http://img.youtube.com/vi/YBK5ZyXHumE/0.jpg)](http://www.youtube.com/watch?v=YBK5ZyXHumE)

- The nightmare is finally over! HTML5 tutorial on how to build a webpage layout 2017

[![The nightmare is finally over! HTML5 tutorial on how to build a webpage layout 2017 - CodeTap](http://img.youtube.com/vi/DdYC36N9z0E/0.jpg)](http://www.youtube.com/watch?v=DdYC36N9z0E)

- Build HTML5 website pain free tutorial for beginners 2017

[![Build HTML5 website pain free tutorial for beginners 2017](http://img.youtube.com/vi/qCyokdeZ6jI/0.jpg)](http://www.youtube.com/watch?v=qCyokdeZ6jI)

Starter package for pug (former jade) template based projects.

**_Note_**: an boolean option **config.render.sourceFileChange** has been added to the _package.json_. The behaviour differs based on the value:

1. **true** - it renders if the source file (pug file) has been changed; This has a much much greater speed when rendering compared to the other option however it's only relevant if you make change to the current file watched by PUG. If you make a change to a file that's extended and resides in a path that contains "\_", like a layout one, the change won't be reflected.
2. **false** - it renders if any pug file has been changed and compares the output with the destination file (the HTML generated now with the previous generated HTML). This can be slower when the number of files increases.

## Live projects built with **_pug-starter_**

If you want your project to be listed here leave a message on [CodeTap on FaceBook](https://facebook.com/codetap). You're project needs to be at least version one final (no beta / alpha or work in progress) will be accepted.

- Author: [Marian Zburlea](https://github.com/marianzburlea)
  - [Eat the Veggie (live)](http://codetapio.github.io/eat-the-veggie) - [Eat the Veggie (source)](https://github.com/codetapio/eat-the-veggie)
  - [W3schools Replica (live)](http://codetapio.github.io/w3schools-replica) - [W3schools Replica (source)](https://github.com/codetapio/w3schools-replica)
  - [My Resume (live)](http://my-resume.bitbee.uk) - [My Resume (source)](https://github.com/marianzburlea/my-resume)
  - [Quick Blog (live)](http://quick-blog.bitbee.uk) - [Quick Blog (source)](https://github.com/marianzburlea/quick-blog)
  - [Tesla Saves Lives (live)](http://tesla.bitbee.uk) - [Tesla Saves Lives (source)](https://github.com/marianzburlea/tesla-saves-lives)
- Author: [Istvan Acs](https://github.com/St3ve89)
  - [Acme mobile first (live)](http://St3ve89.github.io/Acme-mobile-first) - [Acme mobile first (source)](https://github.com/St3ve89/Acme-mobile-first)
  - [Thumb Gallery (live)](http://St3ve89.github.io/thumbgallery) - [Thumb Gallery (source)](https://github.com/St3ve89/thumbgallery)

## Prerequisites

The project requires NodeJS v.4+

To install NodeJS visit [nodejs download page](https://nodejs.org/en/download/) download the appropiate package for your operatin system, click on the downloaded file, open it and follow the installation procees. If you don't know much about it, just click ALL the NEXT and or INSTALL buttons and choose "I agree" when prompted and you should be fine.

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

The project supports both **_embed_** and **_external_** style sheets. You can have none, one or the other, or both of them.

### Single page application style

When you're building a single page app or website, there is no point in having the style sheets loaded from an external file and I'll explain why: the point of loading external style sheets is to allow the browser to cache those files and once you visit another web page of the same website, instead of making another request(s) for the style sheet file(s) to the server and having to download them, if there is no change, the browser will load them from the local drive. In a single page, there is no other page to go to therefore the external file technique doesn't apply.

### Multi page application style

In this scenario you can have either both **_embed_** and external or just external. The most common scenario is to have only one external style sheet file to be loaded and most of the time that's just fine.

If you want to improve your SEO and user experience even further, I strongly recommend to use a combination of both **_embed_** and external. The **_embed_** style sheet should only contain the minimum amount of styles for the initial visible part of the page to render. The rest of the styles can be put in the external CSS file.
