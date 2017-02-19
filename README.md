# es2015-library-skeleton

[![Build Status](https://travis-ci.org/jedwards1211/es2015-library-skeleton.svg?branch=master)](https://travis-ci.org/jedwards1211/es2015-library-skeleton)
[![Coverage Status](https://coveralls.io/repos/github/jedwards1211/es2015-library-skeleton/badge.svg?branch=master)](https://coveralls.io/github/jedwards1211/es2015-library-skeleton?branch=master)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

This is my personal skeleton for creating an ES2015 library npm package.  You are welcome to use it.

## Quick start

```sh
# this PR of mine will hopefully be merged soon
npm i -g howardroark/pollinate#keep-history
pollinate https://github.com/jedwards1211/es2015-library-skeleton.git#pollinate --name <package name> --author <your name> --organization <github organization> --description <package description>
cd <package name>
npm i
```

## Tools used

* babel 6
* mocha
* chai
* istanbul
* nyc
* babel-plugin-istanbul
* eslint
* eslint-watch
* flow
* flow-watch
* pre-commit (runs eslnt and flow)
* semantic-release
* Travis CI
* Coveralls

