// @flow

import * as React from 'react'
import { spy } from 'sinon'
import { assert } from 'chai'
import createMount from './utils/createMount'
import Button from '@material-ui/core/Button'
import Popper from '@material-ui/core/Popper'
import Popover from '@material-ui/core/Popover'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import PopupState, {
  anchorRef,
  bindMenu,
  bindPopover,
  bindPopper,
  bindTrigger,
  bindToggle,
  bindHover,
  type InjectedProps,
} from '../src'

import { after, before, beforeEach, describe, it } from 'mocha'

/* eslint-disable react/jsx-handler-names */

describe('<PopupState />', () => {
  let mount

  before(() => {
    mount = createMount()
  })

  after(() => {
    mount.cleanUp()
  })

  describe('bindMenu/bindTrigger', () => {
    let buttonRef
    let button
    let menu

    const render = spy(popupState => (
      <React.Fragment>
        <Button buttonRef={c => (buttonRef = c)} {...bindTrigger(popupState)}>
          Open Menu
        </Button>
        <Menu {...bindMenu(popupState)}>
          <MenuItem onClick={popupState.close}>Test</MenuItem>
        </Menu>
      </React.Fragment>
    ))

    beforeEach(() => render.resetHistory())

    it('passes correct props to bindTrigger/bindPopup', () => {
      const wrapper = mount(
        <PopupState variant="popover" popupId="menu">
          {render}
        </PopupState>
      )
      button = wrapper.find(Button)
      menu = wrapper.find(Menu)
      assert.strictEqual(render.args[0][0].isOpen, false)
      assert.strictEqual(button.prop('aria-owns'), null)
      assert.strictEqual(button.prop('aria-haspopup'), true)
      assert.strictEqual(button.prop('onClick'), render.args[0][0].open)
      assert.strictEqual(menu.prop('id'), 'menu')
      assert.strictEqual(menu.prop('open'), false)
      assert.strictEqual(menu.prop('onClose'), render.args[0][0].close)

      button.simulate('click')
      wrapper.update()
      button = wrapper.find(Button)
      menu = wrapper.find(Menu)
      assert.strictEqual(render.args[1][0].isOpen, true)
      assert.strictEqual(button.prop('aria-owns'), 'menu')
      assert.strictEqual(button.prop('aria-haspopup'), true)
      assert.strictEqual(button.prop('onClick'), render.args[1][0].open)
      assert.strictEqual(menu.prop('id'), 'menu')
      assert.strictEqual(menu.prop('anchorEl'), buttonRef)
      assert.strictEqual(menu.prop('open'), true)
      assert.strictEqual(menu.prop('onClose'), render.args[1][0].close)

      wrapper.find(MenuItem).simulate('click')
      wrapper.update()
      button = wrapper.find(Button)
      menu = wrapper.find(Menu)
      assert.strictEqual(render.args[2][0].isOpen, false)
      assert.strictEqual(button.prop('aria-owns'), null)
      assert.strictEqual(button.prop('aria-haspopup'), true)
      assert.strictEqual(button.prop('onClick'), render.args[2][0].open)
      assert.strictEqual(menu.prop('id'), 'menu')
      assert.strictEqual(menu.prop('open'), false)
      assert.strictEqual(menu.prop('onClose'), render.args[2][0].close)
    })
    it('open/close works', () => {
      const wrapper = mount(
        <PopupState variant="popover" popupId="menu">
          {render}
        </PopupState>
      )

      render.args[0][0].open(buttonRef)
      wrapper.update()
      assert.strictEqual(render.args[1][0].isOpen, true)

      render.args[1][0].close()
      wrapper.update()
      assert.strictEqual(render.args[2][0].isOpen, false)
    })
    it('toggle works', () => {
      const wrapper = mount(
        <PopupState variant="popover" popupId="menu">
          {render}
        </PopupState>
      )

      render.args[0][0].toggle(buttonRef)
      wrapper.update()
      assert.strictEqual(render.args[1][0].isOpen, true)

      render.args[1][0].toggle(buttonRef)
      wrapper.update()
      assert.strictEqual(render.args[2][0].isOpen, false)
    })
    it('setOpen works', () => {
      const wrapper = mount(
        <PopupState variant="popover" popupId="menu">
          {render}
        </PopupState>
      )

      render.args[0][0].setOpen(true, buttonRef)
      wrapper.update()
      assert.strictEqual(render.args[1][0].isOpen, true)

      render.args[1][0].setOpen(false)
      wrapper.update()
      assert.strictEqual(render.args[2][0].isOpen, false)
    })
  })
  describe('bindMenu/bindTrigger with anchorRef', () => {
    let button
    let menu
    let divRef

    const popupStates = []
    let lastPopupState: InjectedProps = (null: any)

    beforeEach(() => {
      popupStates.length = 0
      lastPopupState = (null: any)
    })

    const MenuTest = () => (
      <PopupState variant="popover" popupId="menu">
        {(popupState: InjectedProps) => {
          popupStates.push(popupState)
          lastPopupState = popupState
          return (
            <React.Fragment>
              <Button {...bindTrigger(popupState)}>Open Menu</Button>
              <div
                ref={(c: ?HTMLElement) => {
                  divRef = c
                  anchorRef(popupState)(c)
                }}
              />
              <Menu {...bindMenu(popupState)}>
                <MenuItem onClick={popupState.close}>Test</MenuItem>
              </Menu>
            </React.Fragment>
          )
        }}
      </PopupState>
    )

    it('passes correct props to bindTrigger/bindMenu', () => {
      const wrapper = mount(<MenuTest />)

      button = wrapper.find(Button)
      menu = wrapper.find(Menu)
      assert.strictEqual(lastPopupState.isOpen, false)
      assert.strictEqual(button.prop('aria-owns'), null)
      assert.strictEqual(button.prop('aria-haspopup'), true)
      assert.strictEqual(button.prop('onClick'), lastPopupState.open)
      assert.strictEqual(menu.prop('id'), 'menu')
      assert.strictEqual(menu.prop('open'), false)
      assert.strictEqual(menu.prop('onClose'), lastPopupState.close)

      button.simulate('click')
      wrapper.update()
      button = wrapper.find(Button)
      menu = wrapper.find(Menu)
      assert.strictEqual(lastPopupState.isOpen, true)
      assert.strictEqual(button.prop('aria-owns'), 'menu')
      assert.strictEqual(button.prop('aria-haspopup'), true)
      assert.strictEqual(button.prop('onClick'), lastPopupState.open)
      assert.strictEqual(menu.prop('id'), 'menu')
      assert.strictEqual(menu.prop('anchorEl'), divRef)
      assert.strictEqual(menu.prop('open'), true)
      assert.strictEqual(menu.prop('onClose'), lastPopupState.close)

      wrapper.find(MenuItem).simulate('click')
      wrapper.update()
      button = wrapper.find(Button)
      menu = wrapper.find(Menu)
      assert.strictEqual(lastPopupState.isOpen, false)
      assert.strictEqual(button.prop('aria-owns'), null)
      assert.strictEqual(button.prop('aria-haspopup'), true)
      assert.strictEqual(button.prop('onClick'), lastPopupState.open)
      assert.strictEqual(menu.prop('id'), 'menu')
      assert.strictEqual(menu.prop('open'), false)
      assert.strictEqual(menu.prop('onClose'), lastPopupState.close)
    })
    it('open/close works', () => {
      const wrapper = mount(<MenuTest />)

      lastPopupState.open()
      wrapper.update()
      assert.strictEqual(lastPopupState.isOpen, true)

      lastPopupState.close()
      wrapper.update()
      assert.strictEqual(lastPopupState.isOpen, false)
    })
    it('toggle works', () => {
      const wrapper = mount(<MenuTest />)

      lastPopupState.toggle()
      wrapper.update()
      assert.strictEqual(lastPopupState.isOpen, true)

      lastPopupState.toggle()
      wrapper.update()
      assert.strictEqual(lastPopupState.isOpen, false)
    })
    it('setOpen works', () => {
      const wrapper = mount(<MenuTest />)

      lastPopupState.setOpen(true)
      wrapper.update()
      assert.strictEqual(lastPopupState.isOpen, true)

      lastPopupState.setOpen(false)
      wrapper.update()
      assert.strictEqual(lastPopupState.isOpen, false)
    })
  })
  describe('bindToggle/bindPopper', () => {
    let buttonRef
    let button
    let popper

    const render = spy(popupState => (
      <React.Fragment>
        <Button buttonRef={c => (buttonRef = c)} {...bindToggle(popupState)}>
          Open Menu
        </Button>
        <Popper {...bindPopper(popupState)}>The popper content</Popper>
      </React.Fragment>
    ))

    beforeEach(() => render.resetHistory())

    it('passes correct props to bindToggle/bindPopup', () => {
      const wrapper = mount(
        <PopupState variant="popper" popupId="popper">
          {render}
        </PopupState>
      )
      button = wrapper.find(Button)
      popper = wrapper.find(Popper)
      assert.strictEqual(render.args[0][0].isOpen, false)
      assert.strictEqual(button.prop('aria-describedby'), null)
      assert.strictEqual(button.prop('aria-haspopup'), undefined)
      assert.strictEqual(button.prop('onClick'), render.args[0][0].toggle)
      assert.strictEqual(popper.prop('id'), 'popper')
      assert.strictEqual(popper.prop('open'), false)
      assert.strictEqual(popper.prop('onClose'), undefined)

      button.simulate('click')
      wrapper.update()
      button = wrapper.find(Button)
      popper = wrapper.find(Popper)
      assert.strictEqual(render.args[1][0].isOpen, true)
      assert.strictEqual(button.prop('aria-describedby'), 'popper')
      assert.strictEqual(button.prop('aria-haspopup'), undefined)
      assert.strictEqual(button.prop('onClick'), render.args[1][0].toggle)
      assert.strictEqual(popper.prop('id'), 'popper')
      assert.strictEqual(popper.prop('anchorEl'), buttonRef)
      assert.strictEqual(popper.prop('open'), true)
      assert.strictEqual(popper.prop('onClose'), undefined)

      button.simulate('click')
      wrapper.update()
      button = wrapper.find(Button)
      popper = wrapper.find(Popper)
      assert.strictEqual(render.args[2][0].isOpen, false)
      assert.strictEqual(button.prop('aria-describedby'), null)
      assert.strictEqual(button.prop('aria-haspopup'), undefined)
      assert.strictEqual(button.prop('onClick'), render.args[2][0].toggle)
      assert.strictEqual(popper.prop('id'), 'popper')
      assert.strictEqual(popper.prop('open'), false)
      assert.strictEqual(popper.prop('onClose'), undefined)
    })
  })
  describe('bindHover/bindPopover', () => {
    let buttonRef
    let button
    let popover
    let content

    const render = spy(popupState => (
      <React.Fragment>
        <Button buttonRef={c => (buttonRef = c)} {...bindHover(popupState)}>
          Open Menu
        </Button>
        <Popover {...bindPopover(popupState)}>
          <span ref={c => (content = c)}>The popover content</span>
        </Popover>
      </React.Fragment>
    ))

    beforeEach(() => render.resetHistory())

    it('passes correct props to bindHover/bindPopover', () => {
      const wrapper = mount(
        <PopupState variant="popover" popupId="popover">
          {render}
        </PopupState>
      )
      button = wrapper.find(Button)
      popover = wrapper.find(Popover)
      assert.strictEqual(render.args[0][0].isOpen, false)
      assert.strictEqual(button.prop('aria-owns'), null)
      assert.strictEqual(button.prop('aria-haspopup'), true)
      assert.strictEqual(button.prop('onMouseEnter'), render.args[0][0].open)
      assert.strictEqual(
        button.prop('onMouseLeave'),
        render.args[0][0].onMouseLeave
      )
      assert.strictEqual(popover.prop('id'), 'popover')
      assert.strictEqual(popover.prop('open'), false)
      assert.strictEqual(popover.prop('onClose'), render.args[0][0].close)

      button.simulate('mouseenter')
      wrapper.update()
      button = wrapper.find(Button)
      popover = wrapper.find(Popover)
      assert.strictEqual(render.args[1][0].isOpen, true)
      assert.strictEqual(button.prop('aria-owns'), 'popover')
      assert.strictEqual(button.prop('aria-haspopup'), true)
      assert.strictEqual(button.prop('onMouseEnter'), render.args[1][0].open)
      assert.strictEqual(
        button.prop('onMouseLeave'),
        render.args[1][0].onMouseLeave
      )
      assert.strictEqual(popover.prop('id'), 'popover')
      assert.strictEqual(popover.prop('anchorEl'), buttonRef)
      assert.strictEqual(popover.prop('open'), true)
      assert.strictEqual(popover.prop('onClose'), render.args[1][0].close)

      button.simulate('mouseleave', { relatedTarget: content })
      wrapper.update()
      button = wrapper.find(Button)
      popover = wrapper.find(Popover)
      assert.strictEqual(button.prop('aria-owns'), 'popover')
      assert.strictEqual(button.prop('aria-haspopup'), true)
      assert.strictEqual(button.prop('onMouseEnter'), render.args[1][0].open)
      assert.strictEqual(
        button.prop('onMouseLeave'),
        render.args[1][0].onMouseLeave
      )
      assert.strictEqual(popover.prop('id'), 'popover')
      assert.strictEqual(popover.prop('anchorEl'), buttonRef)
      assert.strictEqual(popover.prop('open'), true)
      assert.strictEqual(popover.prop('onClose'), render.args[1][0].close)

      popover.simulate('mouseleave')
      wrapper.update()
      button = wrapper.find(Button)
      popover = wrapper.find(Popover)
      assert.strictEqual(render.args[2][0].isOpen, false)
      assert.strictEqual(button.prop('aria-owns'), null)
      assert.strictEqual(button.prop('aria-haspopup'), true)
      assert.strictEqual(button.prop('onMouseEnter'), render.args[2][0].open)
      assert.strictEqual(
        button.prop('onMouseLeave'),
        render.args[2][0].onMouseLeave
      )
      assert.strictEqual(popover.prop('id'), 'popover')
      assert.strictEqual(popover.prop('open'), false)
      assert.strictEqual(popover.prop('onClose'), render.args[2][0].close)
    })
  })
})
