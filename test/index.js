// @flow

import { describe, it } from 'mocha'
import * as React from 'react'
import { mount } from 'enzyme'
import { expect } from 'chai'

import Hello from '../src/index'

describe('test setup', () => {
  it('works', () => {
    const comp = mount(<Hello />)
    expect(comp.text()).to.equal('Hello world!')
  })
})
