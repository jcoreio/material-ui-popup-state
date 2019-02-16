/* eslint-env browser, commonjs */

import * as React from 'react'
import ReactDOM from 'react-dom'
import Root from './Root'

let reloads = 0
const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('#root not found')

function mount(Root) {
  ReactDOM.render(<Root key={++reloads} />, rootElement)
}

if (module.hot instanceof Object) {
  module.hot.accept('./Root', () => {
    mount(require('./Root').default)
  })
}

mount(Root)
