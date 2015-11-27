# Beyond Conference 2016
Beyond is a one day conference to inspire, motivate and support those just starting out in web development.

The Beyond Conference website is a static site that is hosted on GitHub Pages (you can find live code in the [gh-pages](https://github.com/steersystems/beyond-2016/tree/gh-pages) branch). The live code is created using Gulp.

## Table of Contents
- [Local Setup](#setup)
- [Production Deployment](#production)
- [Creating Branches](#creating-branches)
- [What is needed for a blog post](#how-to-create-a-new-blog-post)
- [Using Data Files](#using-datafiles)

## Setup

To work on this project you will need the following tools installed on your machine

- [Node.js (including npm)](https://nodejs.org/en/)
- Ruby
- Git
- [Bower](https://github.com/bower/bower)

Before you can make changes to the project you will need to install a number of development dependencies

The project uses Gulp as a build tool, along with a number of other dependencies that are controlled via npm. You can see a full list of the dependencies controlled via npm in the `package.json` file.
```
npm install
```

## Development
Ensure you have installed all of the dependencies listed in **setup** before continuing.

### Running the project locally
Launch the site for development. When start the project in development a number of tasks will be performed for you.

- The site will be compiled through Jekyll - rather interacting with the Jekyll gem directly using the command line like the documentation suggests we use gulp to do this for us.
- Sass files will be compiled, ran through auto prefixer to add any vendor prefixes.
- Javascript files will be linted for errors, transpiled using Babel, bundled together into one file with Browserify.
- A local server will be started and a browser window opened at the index page.
- A watch task will be started that allows Gulp to re-perfom any of these tasks when you make changes to files so you don't have to keep starting gulp it will keep running and wait for changes.
- When making changes to CSS+JS BrowserSync is able to inject these into the page without reloaded however when making changes to the HTML you will see the page refresh automatically for you

Start the site in development with gulp:
```
gulp dev
```

To launch Jekyll with draft posts enabled run gulp dev with the --drafts flag
```
gulp dev --drafts
```

### Bower
Bower is a dependency manager. When using Bower there is no need to check in dependencies to source control and individual dependencies can easily be updated when necessary.

Install new dependencies with `bower install name` most vendors list bower as a method of installation, a list of the current dependencies for the project are stored in `bower.json`. The dependencies downloaded are stored in the `bower_components` folder that is ignored by github but used through the project just like any another.

#### Browserify Shim
To allow some third party modules/plugins to work such as fitvids that expects `$` to be defined globally. We can use the shim that ids included, as normally browserify will not allow anything to pollute the global scope. Files that need to be shimmed are listed in the `package.json`, they still need to be included in the JS file via an import.

## Production

To prepare the site for production there is a slightly different set of tasks that minifies the JS/CSS while also cleaning folders so only strickly necessary files remain. The watch task is not started and no local server is initalized.  

```
gulp build
```
The production ready site will be generated in `_site/` folder. Check the production version of the site was generated correctly.
```
gulp serve
```
if everything looks good you can deploy this build.

## Deploying to Github Pages
Deploy the contents of `_site/` to Github Pages with an optional message for this version
```
gulp deploy --m 'Commit message'
```

## Creating branches
Whenever some code is to be written for Beyond site it should be created in a new git branch `git checkout -b name-of-branch` from the `master` branch.
There are a few naming conventions we use when creating branches:
- `bug-branch-name`, prepend your branch name with `bug` when writing code that will fix a bug
- `feature-branch-name`, prepend your branch name with `feature` when creating a new feature or updating one
- `content-branch-name`, prepend your branch name with `content` when adding new content to the site, this could be a new blog post or adding new speakers text etc.

## How to create a new blog post
When creating a blog post there are some things that will make it a lot easier for the development team to get it up online. Here are the things we need from you:
- A plain text file of the copy for the post
- If you have images that will appear inline in the blog content could you signify where they will be by putting this at the location `[name-of-blog-post-image-name.jpg/png]`
- The images that will appear inline in the blog post should be named in the following format `name-of-blog-post-image-name.jpg/png` and have the width of `662px` e.g `designing-beyond-brainstorming.jpg/png`
- An open graph that will be used on social sites when sharing the link, these should be named `name-of-blog-post-og.jpg/png` and should be `1200px` wide and `630px` tall
- A header image that will appear above the posts content, these should be named `name-of-blog-post-header.jpg/png` and should be `812px` wide and `348px` tall
- A small preview image that is used on the blog listing page, these should be named `name-of-blog-post-preview.jpg/png` and should be `348px` wide and `348px` tall

Having all this to hand at least a day before the blog post is due to go live will mean it will be super smooth process and means it won't be a last minute scrabble 🚀💖

## Using Datafiles
Data files are located within `_data` folder and are used to populate information about the speakers and  workshops. The data files also control the order information is listed on the schedule page for both workshops and speakers.

### Speaker Information
Each speaker should have their revevant information listed in the `_data/speakers.yaml` file. Follow the format below to add a new speaker
```
- speaker: true
  name: Jane Doe
  start_time: '15:10'
  duration: 30
  anchor: jane
  image: speaker-jane-doe.jpg
  position: Web Developer
  company: Awesome
  url: https://www.awesomeco.com/
  github: janedoecode
  twitter: janedoecode
  title: Web Dev Party
  description: >
    <p>Description within paragraphs tags</p>
```
An image should be added in the `img/` folder following the naming convention speaker-first-last.ext.

The postion of the new speaker and duration will effect the schedule page see schedule page ordering below.

### Workshop Information
Workshop information is located within `_data/workshops.yaml` and follows the same format as speaker information.

### Index Page Order
Speaker order is controlled via the `speaker_order` list in the index.html page front matter. The speaker will be looked for in the data files where the name property matches.

Workshop order is a manual lookup in the index page you will see each workshop uses liquid where filter to look for a workshop where the anchor property mateches

## Schedule Page Order
The speaker order on the schedule page is controlled by the order the information is listed within the `speakers.yaml` file the first speaker listed will be the first speaker in the schedule and so on. The duration property will control the height of the speakers block (`height: floor(6.6667 * (mins*5) )+ px;`) see `_sechedule.scss` .

The workshop order works differently than the speakers and the order in which workshops are listed has no effect on the order in which they appear on the schedule. The `_data/workshops_schedule.yaml` lists the schedule for workshops where the room is paired with a workshop host - the value for the room is matched with an anchor for the relevant workshop host within `_data/workshops.yaml`

