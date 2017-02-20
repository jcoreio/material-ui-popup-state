#!/usr/bin/env node

var merge = require('lodash.merge')

var merged = merge.apply(undefined, process.argv.slice(2).map(function (file) { return require('./' + file) }))
console.log(JSON.stringify(merged, null, 2))

