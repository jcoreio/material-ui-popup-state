import { describe, it } from 'mocha'
import { expect } from 'chai'
import { chainEventHandlers } from '../src/chainEventHandlers'

describe(`chainEventHandlers`, function () {
  it(`works`, function () {
    const calls: [string, any][] = []
    const combined = chainEventHandlers(
      {
        a: 1,
        b: 3,
        onClick: (arg: any) => {
          calls.push(['a', arg])
        },
      },
      {
        a: 2,
        onClick: (arg: any) => {
          calls.push(['b', arg])
        },
        onBlah: (arg: any) => {
          calls.push(['blah-b', arg])
        },
      },
      {
        c: 4,
        onClick: (arg: any) => {
          calls.push(['c', arg])
        },
        onBlah: (arg: any) => {
          calls.push(['blah-c', arg])
        },
      }
    )
    expect(Object.keys(combined).sort()).to.deep.equal(
      ['a', 'b', 'c', 'onClick', 'onBlah'].sort()
    )
    expect(combined.a).to.equal(2)
    expect(combined.b).to.equal(3)
    expect(combined.c).to.equal(4)

    combined.onClick('foo')
    expect(calls).to.deep.equal([
      ['a', 'foo'],
      ['b', 'foo'],
      ['c', 'foo'],
    ])
    calls.length = 0
    combined.onBlah('blah')
    expect(calls).to.deep.equal([
      ['blah-b', 'blah'],
      ['blah-c', 'blah'],
    ])
  })
})
