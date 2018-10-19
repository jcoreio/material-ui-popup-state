# es2015-library-skeleton

[![Build Status](https://travis-ci.org/jedwards1211/es2015-library-skeleton.svg?branch=master)](https://travis-ci.org/jedwards1211/es2015-library-skeleton)
[![Coverage Status](https://codecov.io/gh/jedwards1211/es2015-library-skeleton/branch/master/graph/badge.svg)](https://codecov.io/gh/jedwards1211/es2015-library-skeleton)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![npm version](https://badge.fury.io/js/es2015-library-skeleton.svg)](https://badge.fury.io/js/es2015-library-skeleton)

This is my personal skeleton for creating an ES2015 library npm package.  You are welcome to use it.

## Quick start

```sh
npm i -g howardroark/pollinate
pollinate https://github.com/jedwards1211/es2015-library-skeleton.git --keep-history --name <package name> --author <your name> --organization <github organization> --description <package description>
cd <package name>
npm i
```

## Tools used

* babel 6
* babel-preset-env
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

