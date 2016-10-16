import React from 'react'
import Hello from '../src/index'
import {mount} from 'enzyme'
import {expect} from 'chai'

describe('test setup', () => {
  it('works', () => {
    const comp = mount(<Hello />)
    expect(comp.text()).to.equal('Hello world!')
  })
})
