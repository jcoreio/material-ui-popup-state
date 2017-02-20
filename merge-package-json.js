#!/usr/bin/env node

var merge = require('lodash.merge')
var fs = require('fs')
var merged = merge(require('./package.json'), require('./PROJECT-package.json'))
fs.writeFileSync('./package.json', JSON.stringify(merged, null, 2), 'utf8')

