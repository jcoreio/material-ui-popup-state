#! /usr/bin/env node
// @flow

var path = require('path')
var spawn = require('child_process').spawn

var root = path.resolve(__dirname, '..')
var flow = path.join(root, 'node_modules', '.bin', 'flow')
var opts = {stdio: 'inherit', cwd: root}

function exec() {
  var child = require('child_process').exec.apply(undefined, arguments)
  child.stdout.pipe(process.stdout)
  child.stderr.pipe(process.stderr)
}

exec('clear', opts, function () {
  exec("printf '\\e[3J'", opts, function () {
    spawn(flow, opts)
  })
})
