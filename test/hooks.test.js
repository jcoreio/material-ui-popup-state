// @flow

import * as React from 'react'
import { assert } from 'chai'
import {
  cleanup,
  render,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
  screen,
} from '@testing-library/react'
import Button from '@mui/material/Button'
import Input from '@mui/material/Input'
import Popper from '@mui/material/Popper'
import Popover from '@mui/material/Popover'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import {
  usePopupState,
  anchorRef,
  bindMenu,
  bindPopper,
  bindPopover,
  bindTrigger,
  bindToggle,
  bindFocus,
  bindHover,
  bindContextMenu,
} from '../src/hooks'
import { afterEach, beforeEach, describe, it } from 'mocha'

const waitForTruthy = (cb, ...opts) =>
  waitFor(() => {
    if (cb()) return
    throw new Error('not true')
  }, ...opts)

/* eslint-disable react/jsx-handler-names */

afterEach(cleanup)

describe('usePopupState', () => {
  describe('bindMenu/bindTrigger', () => {
    let buttonRef: any
    let button
    let menu

    const popupStates = []

    beforeEach(() => (popupStates.length = 0))

    const MenuTest = (): React.Node => {
      const popupState = usePopupState({ popupId: 'menu', variant: 'popover' })
      popupStates.push(popupState)
      return (
        <React.Fragment>
          <Button {...bindTrigger(popupState)} ref={(c) => (buttonRef = c)}>
            Open Menu
          </Button>
          <Menu data-testid="menu" {...bindMenu(popupState)}>
            <MenuItem data-testid="menuitem" onClick={popupState.close}>
              Test
            </MenuItem>
          </Menu>
        </React.Fragment>
      )
    }

    it('passes correct props to bindTrigger/bindMenu', async () => {
      render(<MenuTest />)
      assert.strictEqual(popupStates[0].isOpen, false)
      button = screen.getByRole('button')
      menu = screen.queryByTestId('menu')
      assert.strictEqual(button.getAttribute('aria-controls'), null)
      assert.strictEqual(button.getAttribute('aria-haspopup'), 'true')
      assert.strictEqual(menu, null)

      fireEvent.click(button)
      menu = screen.getByTestId('menu')
      assert.strictEqual(popupStates[1].isOpen, true)
      assert.strictEqual(button.getAttribute('aria-controls'), 'menu')
      assert.strictEqual(button.getAttribute('aria-haspopup'), 'true')
      assert.strictEqual(menu.getAttribute('id'), 'menu')

      await Promise.all([
        waitForElementToBeRemoved(menu),
        fireEvent.click(screen.getByTestId('menuitem')),
      ])
      assert.strictEqual(popupStates[2].isOpen, false)
      assert.strictEqual(button.getAttribute('aria-controls'), null)
      assert.strictEqual(button.getAttribute('aria-haspopup'), 'true')
    })

    it('open/close works', async () => {
      render(<MenuTest />)

      await waitForTruthy(() => popupStates[0])
      popupStates[0].open(buttonRef)
      await waitForTruthy(() => popupStates[1])
      assert.strictEqual(popupStates[1].isOpen, true)

      popupStates[1].close()
      await waitForTruthy(() => popupStates[2])
      assert.strictEqual(popupStates[2].isOpen, false)
    })
    it('toggle works', async () => {
      render(<MenuTest />)

      await waitForTruthy(() => popupStates[0])
      popupStates[0].toggle(buttonRef)
      await waitForTruthy(() => popupStates[1])
      assert.strictEqual(popupStates[1].isOpen, true)

      popupStates[1].toggle(buttonRef)
      await waitForTruthy(() => popupStates[2])
      assert.strictEqual(popupStates[2].isOpen, false)
    })
    it('setOpen works', async () => {
      render(<MenuTest variant="popover" popupId="menu" />)

      await waitForTruthy(() => popupStates[0])
      popupStates[0].setOpen(true, buttonRef)
      await waitForTruthy(() => popupStates[1])
      assert.strictEqual(popupStates[1].isOpen, true)

      popupStates[1].setOpen(false)
      await waitForTruthy(() => popupStates[2])
      assert.strictEqual(popupStates[2].isOpen, false)
    })
  })
  describe('bindMenu/bindContextMenu', () => {
    let button
    let menu

    const MenuTest = (): React.Node => {
      const popupState = usePopupState({ popupId: 'menu', variant: 'popover' })
      return (
        <React.Fragment>
          <Button {...bindContextMenu(popupState)}>Open Menu</Button>
          <Menu data-testid="menu" {...bindMenu(popupState)}>
            <MenuItem data-testid="menuitem" onClick={popupState.close}>
              Test
            </MenuItem>
          </Menu>
        </React.Fragment>
      )
    }

    it('passes correct props to bindContextMenu/bindMenu', async () => {
      render(<MenuTest />)
      button = screen.getByRole('button')
      menu = screen.queryByTestId('menu')
      assert.strictEqual(button.getAttribute('aria-controls'), null)
      assert.strictEqual(button.getAttribute('aria-haspopup'), 'true')
      assert.strictEqual(menu, null)

      fireEvent.contextMenu(button)
      menu = screen.getByTestId('menu')
      assert.strictEqual(button.getAttribute('aria-controls'), 'menu')
      assert.strictEqual(button.getAttribute('aria-haspopup'), 'true')
      assert.strictEqual(menu.getAttribute('id'), 'menu')

      await Promise.all([
        waitForElementToBeRemoved(menu),
        fireEvent.click(screen.getByTestId('menuitem')),
      ])
      assert.strictEqual(button.getAttribute('aria-controls'), null)
      assert.strictEqual(button.getAttribute('aria-haspopup'), 'true')
    })
  })
  describe('bindPopover/bindFocus', () => {
    let input
    let popover

    const MenuTest = (): React.Node => {
      const popupState = usePopupState({
        popupId: 'info',
        variant: 'popover',
        disableAutoFocus: true,
      })
      return (
        <React.Fragment>
          <Input
            inputProps={{ 'data-testid': 'input', ...bindFocus(popupState) }}
          />
          <Popover data-testid="popover" {...bindPopover(popupState)}>
            Info
          </Popover>
        </React.Fragment>
      )
    }

    it('passes correct props to bindFocus/bindPopover', async () => {
      render(<MenuTest />)
      input = screen.getByTestId('input')
      popover = screen.queryByTestId('popover')
      assert.strictEqual(input.getAttribute('aria-controls'), null)
      assert.strictEqual(input.getAttribute('aria-haspopup'), 'true')
      assert.strictEqual(popover, null)

      fireEvent.focus(input)
      popover = screen.getByTestId('popover')
      assert.strictEqual(input.getAttribute('aria-controls'), 'info')
      assert.strictEqual(input.getAttribute('aria-haspopup'), 'true')
      assert.strictEqual(popover.getAttribute('id'), 'info')

      await Promise.all([
        waitForElementToBeRemoved(popover),
        fireEvent.blur(input),
      ])
      assert.strictEqual(input.getAttribute('aria-controls'), null)
      assert.strictEqual(input.getAttribute('aria-haspopup'), 'true')
    })
  })
  describe('bindHover/bindPopover', () => {
    let button
    let popover

    function TestComp(): React.Node {
      const popupState = usePopupState({
        variant: 'popover',
        popupId: 'popover',
      })
      return (
        <React.Fragment>
          <Button {...bindHover(popupState)}>Open Menu</Button>
          <Popover data-testid="popover" {...bindPopover(popupState)}>
            <span data-testid="content">The popover content</span>
          </Popover>
        </React.Fragment>
      )
    }

    it('passes correct props to bindHover/bindPopover', async () => {
      render(<TestComp />)
      button = screen.getByRole('button')
      popover = screen.queryByTestId('popover')
      assert.strictEqual(button.getAttribute('aria-controls'), null)
      assert.strictEqual(button.getAttribute('aria-haspopup'), 'true')
      assert.strictEqual(popover, null)

      fireEvent.mouseOver(button)
      popover = screen.getByTestId('popover')
      assert.strictEqual(button.getAttribute('aria-controls'), 'popover')
      assert.strictEqual(button.getAttribute('aria-haspopup'), 'true')
      assert.strictEqual(popover.getAttribute('id'), 'popover')

      fireEvent.mouseLeave(button, {
        relatedTarget: screen.getByTestId('content'),
      })
      assert.strictEqual(button.getAttribute('aria-controls'), 'popover')
      assert.strictEqual(button.getAttribute('aria-haspopup'), 'true')
      assert.strictEqual(popover.getAttribute('id'), 'popover')

      await Promise.all([
        waitForElementToBeRemoved(popover),
        fireEvent.mouseLeave(popover),
      ])
      assert.strictEqual(button.getAttribute('aria-controls'), null)
      assert.strictEqual(button.getAttribute('aria-haspopup'), 'true')
    })
  })
  describe('bindPopover/bindFocus/bindHover', () => {
    let input
    let popover

    const MenuTest = (): React.Node => {
      const popupState = usePopupState({
        popupId: 'info',
        variant: 'popover',
        disableAutoFocus: true,
      })
      return (
        <React.Fragment>
          <Input
            inputProps={{
              'data-testid': 'input',
              ...bindFocus(popupState),
              ...bindHover(popupState),
            }}
          />
          <Popover data-testid="popover" {...bindPopover(popupState)}>
            Info
          </Popover>
        </React.Fragment>
      )
    }

    for (const events of [
      ['focus', 'mouseOver', 'blur', 'mouseLeave'],
      ['focus', 'blur', 'mouseOver', 'mouseLeave'],
      ['mouseOver', 'focus', 'mouseLeave', 'blur'],
      ['mouseOver', 'focus', 'blur', 'mouseLeave'],
      ['focus', 'mouseOver', 'mouseLeave', 'blur'],
    ]) {
      it(`works for ${events.join(', ')}`, async function () {
        render(<MenuTest />)
        input = screen.getByTestId('input')
        popover = screen.queryByTestId('popover')
        assert.strictEqual(input.getAttribute('aria-controls'), null)
        assert.strictEqual(input.getAttribute('aria-haspopup'), 'true')
        assert.strictEqual(popover, null)

        let hovered = false
        let focused = false

        for (const type of events) {
          switch (type) {
            case 'focus':
              focused = true
              break
            case 'blur':
              focused = false
              break
            case 'mouseOver':
              hovered = true
              break
            case 'mouseLeave':
              hovered = false
              break
          }
          const open = hovered || focused
          fireEvent[type](input)
          input = screen.getByTestId('input')
          assert.strictEqual(
            input.getAttribute('aria-controls'),
            open ? 'info' : null
          )
          assert.strictEqual(input.getAttribute('aria-haspopup'), 'true')
          if (open) {
            popover = screen.getByTestId('popover')
            assert.strictEqual(popover.getAttribute('id'), 'info')
          } else if (popover) {
            await waitForElementToBeRemoved(popover)
          }
        }
      })
    }
  })
  describe('bindMenu/bindTrigger with anchorRef', () => {
    let button
    let menu

    const MenuTest = (): React.Node => {
      const popupState = usePopupState({ popupId: 'menu', variant: 'popover' })
      return (
        <React.Fragment>
          <Button {...bindTrigger(popupState)}>Open Menu</Button>
          <div data-testid="div" ref={anchorRef(popupState)} />
          <Menu data-testid="menu" {...bindMenu(popupState)}>
            <MenuItem data-testid="menuitem" onClick={popupState.close}>
              Test
            </MenuItem>
          </Menu>
        </React.Fragment>
      )
    }

    it('passes correct props to bindTrigger/bindMenu', async () => {
      render(<MenuTest />)

      button = screen.getByRole('button')
      menu = screen.queryByTestId('menu')
      assert.strictEqual(button.getAttribute('aria-controls'), null)
      assert.strictEqual(button.getAttribute('aria-haspopup'), 'true')
      assert.strictEqual(menu, null)

      fireEvent.click(button)
      menu = screen.getByTestId('menu')
      assert.strictEqual(button.getAttribute('aria-controls'), 'menu')
      assert.strictEqual(button.getAttribute('aria-haspopup'), 'true')
      assert.strictEqual(menu.getAttribute('id'), 'menu')

      await Promise.all([
        waitForElementToBeRemoved(menu),
        fireEvent.click(screen.getByTestId('menuitem')),
      ])
      assert.strictEqual(button.getAttribute('aria-controls'), null)
      assert.strictEqual(button.getAttribute('aria-haspopup'), 'true')
    })
  })
  describe('bindToggle/bindPopper', () => {
    let button
    let popper

    const PopperTest = (): React.Node => {
      const popupState = usePopupState({ popupId: 'popper', variant: 'popper' })
      return (
        <React.Fragment>
          <Button {...bindToggle(popupState)}>Open Menu</Button>
          <Popper data-testid="popper" {...bindPopper(popupState)}>
            The popper content
          </Popper>
        </React.Fragment>
      )
    }

    it('passes correct props to bindToggle/bindPopper', async () => {
      render(<PopperTest variant="popper" popupId="popper" />)
      button = screen.getByRole('button')
      popper = screen.queryByTestId('popper')
      assert.strictEqual(button.getAttribute('aria-describedby'), null)
      assert.strictEqual(button.getAttribute('aria-haspopup'), null)
      assert.strictEqual(popper, null)

      fireEvent.click(button)
      popper = screen.getByTestId('popper')
      assert.strictEqual(button.getAttribute('aria-describedby'), 'popper')
      assert.strictEqual(button.getAttribute('aria-haspopup'), null)
      assert.strictEqual(popper.getAttribute('id'), 'popper')

      await Promise.all([
        waitForElementToBeRemoved(popper),
        fireEvent.click(button),
      ])
    })
  })
})
