import { describe, it, afterEach } from 'mocha'
import { screen, render, cleanup } from '@testing-library/react'
import { expect } from 'chai'
import * as React from 'react'
import HoverMenu from '../src/HoverMenu'

afterEach(cleanup)

describe(`HoverMenu`, function () {
  it(`supports slotProps.paper function`, function () {
    render(
      <HoverMenu
        data-testid="menu"
        open
        slotProps={{
          paper: () => ({
            'data-testid': 'paper',
            style: { backgroundColor: 'red' },
          }),
        }}
      />
    )
    const paper = screen.getByTestId('paper')
    expect(getComputedStyle(paper).backgroundColor).to.equal('rgb(255, 0, 0)')
  })
  it(`supports slotProps.paper object`, function () {
    render(
      <HoverMenu
        data-testid="menu"
        open
        slotProps={{
          paper: {
            // @ts-expect-error bad type defs
            'data-testid': 'paper',
            style: { backgroundColor: 'red' },
          },
        }}
      />
    )
    const paper = screen.getByTestId('paper')
    expect(getComputedStyle(paper).backgroundColor).to.equal('rgb(255, 0, 0)')
  })
})
