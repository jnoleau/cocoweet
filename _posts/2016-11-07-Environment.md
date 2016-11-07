---
layout: post
title: The environment
---

The first step : set a working dev environment. We want to be able to open a window in Electron,
load hmtl with hot reload capabilities for React & CSS. The stack we want is ES6 with flowtype and
some linting rules.

The [pull request](https://github.com/jnoleau/cocoweet/pull/1)

### Boilerplate

Boilerplate are the easiest solution to try a new set of technologies. I love them to quickly clone
and test a solution. I will use this [one](https://github.com/chentsulin/electron-react-boilerplate)
as a model & inspiration.

Boilerplate are good to test but not to start a new project. I need to understand all the bricks of
the project, I don't need 42 `node_modules` if I want to use only 3 of them and I want to have the control of
the configuration from scratch. The boilerplate is a good example of something working, **not a starter**.

### Opening a window

If you don't know what Electron is read the [quick start](http://electron.atom.io/docs/tutorial/quick-start/)
from the official doc.

The main process will load `index.js` written in ES6. For ES6 syntax, [babel](https://babeljs.io/) is
the reference for tranforming files into ES5 syntax. The package `babel-register` compiles ES6 files on
the fly, by hooking the `require` node native function with its own (NB: requiring node_modules are
ignored by default by `babel-register`). To understand don't read `node::require` anymore but
`babel::require` instead. When we say `electron -r babel-register ./index`, the index file will not be
*node::required* but *babel::required* so we can use ES6 syntax directly.

Babel is used with `["es2015", "stage-2"]` transforms presets.

We are now ready to open a single window with Electron loading an simple html file. All the files of
the *app* loaded by electron will reside in the app directory.
```
cocoweet/
├── app/
  ├── index.js     // our "render" app
  └── index.html   // the render process loads this file
├── index.js       // electron loads this file
└── index.html
```

For the convenience we will install some extensions to the chrome used inside Electron like *REACT_DEVELOPER_TOOLS*
with the help of `electron-devtools-installer`. We also need `babel-polyfill` in order to use async / await syntax of
Promise.

### The app

I am not going to focus on this part because there a lot of documentations & tutorial on the web about this part.
This is a classical React app laoding by the "Chrome browser" running by the Electron renderer process.
We will use :

* webpack : to bundle all our files of different type into assets understandable for the browser
* express & webpack middlewares : in dev mode in order to have hot reloading capabilities
* css modules & postcss : to be able to write new generation of css by namespaced by components

### Linters

Linters are helpers to be clean and consistent when writing our code. There are very usefull especially when used with editors like atom with [linter](https://atom.io/packages/linter) plugins. We are going to use :

* [eslint](http://eslint.org/) to lint JS files extending airbnb rule and this [atom linter-eslint](https://atom.io/packages/linter-eslint)
* [flowtype](https://flowtype.org/), it's not exactly a linter but it's an helper to type your JS code. Used with this [atom linter-flow](https://atom.io/packages/linter-flow)
* [stylelint](http://stylelint.io/) with [atom linter-stylelint](https://atom.io/packages/linter-stylelint)
