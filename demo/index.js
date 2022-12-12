/* eslint-env browser, commonjs */

import * as React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './Root'

let reloads = 0
const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('#root not found')
const root = ReactDOM.createRoot(rootElement)

function mount(Root) {
  root.render(<Root key={++reloads} />)
}

if (module.hot instanceof Object) {
  module.hot.accept('./Root', () => {
    mount(require('./Root').default)
  })
}

mount(Root)
