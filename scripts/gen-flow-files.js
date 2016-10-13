// @flow
/* eslint-env es6 */

import glob from 'glob'
import {exec} from 'child_process'
import path from 'path'
import fs from 'fs'
import flow from 'flow-bin'
import asyncScript from './asyncScript'
import promisify from 'es6-promisify'

const src = path.resolve(__dirname, '..', 'src')
const lib = path.resolve(__dirname, '..', 'lib')

asyncScript(async () => {
  const files = await promisify(glob)(path.join(src, '**.js'))
  await Promise.all(files.map(async file => {
    const stdout = await promisify(exec)(`${flow} gen-flow-files ${file}`)
    const outfile = path.join(lib, path.relative(src, file)) + '.flow'
    await promisify(fs.writeFile)(outfile, stdout, 'utf8')
    console.log('wrote', outfile)
  }))
})
