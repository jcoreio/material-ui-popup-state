// @flow

import * as React from 'react'
import { assert } from 'chai'
import { mount } from 'enzyme'
import Button from '@material-ui/core/Button'
import Popper from '@material-ui/core/Popper'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import {
  usePopupState,
  anchorRef,
  bindMenu,
  bindPopper,
  bindTrigger,
  bindToggle,
  type PopupState,
} from '../src/hooks'

import { after, before, beforeEach, describe, it } from 'mocha'

/* eslint-disable react/jsx-handler-names */

describe('usePopupState', () => {
  describe('bindMenu/bindTrigger', () => {
    let buttonRef
    let button
    let menu

    const popupStates = []

    beforeEach(() => (popupStates.length = 0))

    const MenuTest = () => {
      const popupState = usePopupState({ popupId: 'menu', variant: 'popover' })
      popupStates.push(popupState)
      return (
        <React.Fragment>
          <Button buttonRef={c => (buttonRef = c)} {...bindTrigger(popupState)}>
            Open Menu
          </Button>
          <Menu {...bindMenu(popupState)}>
            <MenuItem onClick={popupState.close}>Test</MenuItem>
          </Menu>
        </React.Fragment>
      )
    }

    it('passes correct props to bindTrigger/bindMenu', () => {
      const wrapper = mount(<MenuTest />)
      button = wrapper.find(Button)
      menu = wrapper.find(Menu)
      assert.strictEqual(popupStates[0].isOpen, false)
      assert.strictEqual(button.prop('aria-owns'), null)
      assert.strictEqual(button.prop('aria-haspopup'), true)
      assert.strictEqual(button.prop('onClick'), popupStates[0].open)
      assert.strictEqual(menu.prop('id'), 'menu')
      assert.strictEqual(menu.prop('open'), false)
      assert.strictEqual(menu.prop('onClose'), popupStates[0].close)

      button.simulate('click')
      wrapper.update()
      button = wrapper.find(Button)
      menu = wrapper.find(Menu)
      assert.strictEqual(popupStates[1].isOpen, true)
      assert.strictEqual(button.prop('aria-owns'), 'menu')
      assert.strictEqual(button.prop('aria-haspopup'), true)
      assert.strictEqual(button.prop('onClick'), popupStates[1].open)
      assert.strictEqual(menu.prop('id'), 'menu')
      assert.strictEqual(menu.prop('anchorEl'), buttonRef)
      assert.strictEqual(menu.prop('open'), true)
      assert.strictEqual(menu.prop('onClose'), popupStates[1].close)

      wrapper.find(MenuItem).simulate('click')
      wrapper.update()
      button = wrapper.find(Button)
      menu = wrapper.find(Menu)
      assert.strictEqual(popupStates[2].isOpen, false)
      assert.strictEqual(button.prop('aria-owns'), null)
      assert.strictEqual(button.prop('aria-haspopup'), true)
      assert.strictEqual(button.prop('onClick'), popupStates[2].open)
      assert.strictEqual(menu.prop('id'), 'menu')
      assert.strictEqual(menu.prop('open'), false)
      assert.strictEqual(menu.prop('onClose'), popupStates[2].close)
    })
    it('open/close works', () => {
      const wrapper = mount(<MenuTest />)

      popupStates[0].open(buttonRef)
      wrapper.update()
      assert.strictEqual(popupStates[1].isOpen, true)

      popupStates[1].close()
      wrapper.update()
      assert.strictEqual(popupStates[2].isOpen, false)
    })
    it('toggle works', () => {
      const wrapper = mount(<MenuTest />)

      popupStates[0].toggle(buttonRef)
      wrapper.update()
      assert.strictEqual(popupStates[1].isOpen, true)

      popupStates[1].toggle(buttonRef)
      wrapper.update()
      assert.strictEqual(popupStates[2].isOpen, false)
    })
    it('setOpen works', () => {
      const wrapper = mount(<MenuTest variant="popover" popupId="menu" />)

      popupStates[0].setOpen(true, buttonRef)
      wrapper.update()
      assert.strictEqual(popupStates[1].isOpen, true)

      popupStates[1].setOpen(false)
      wrapper.update()
      assert.strictEqual(popupStates[2].isOpen, false)
    })
  })
  describe('bindMenu/bindTrigger with anchorRef', () => {
    let button
    let menu
    let divRef

    const popupStates = []
    let lastPopupState: PopupState = (null: any)

    beforeEach(() => {
      popupStates.length = 0
      lastPopupState = (null: any)
    })

    const MenuTest = () => {
      const popupState = usePopupState({ popupId: 'menu', variant: 'popover' })
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
    }

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

    const popupStates = []

    beforeEach(() => (popupStates.length = 0))

    const PopperTest = () => {
      const popupState = usePopupState({ popupId: 'popper', variant: 'popper' })
      popupStates.push(popupState)
      return (
        <React.Fragment>
          <Button buttonRef={c => (buttonRef = c)} {...bindToggle(popupState)}>
            Open Menu
          </Button>
          <Popper {...bindPopper(popupState)}>The popper content</Popper>
        </React.Fragment>
      )
    }

    it('passes correct props to bindToggle/bindPopper', () => {
      const wrapper = mount(<PopperTest variant="popper" popupId="popper" />)
      button = wrapper.find(Button)
      popper = wrapper.find(Popper)
      assert.strictEqual(popupStates[0].isOpen, false)
      assert.strictEqual(button.prop('aria-describedby'), null)
      assert.strictEqual(button.prop('aria-haspopup'), undefined)
      assert.strictEqual(button.prop('onClick'), popupStates[0].toggle)
      assert.strictEqual(popper.prop('id'), 'popper')
      assert.strictEqual(popper.prop('open'), false)
      assert.strictEqual(popper.prop('onClose'), undefined)

      button.simulate('click')
      wrapper.update()
      button = wrapper.find(Button)
      popper = wrapper.find(Popper)
      assert.strictEqual(popupStates[1].isOpen, true)
      assert.strictEqual(button.prop('aria-describedby'), 'popper')
      assert.strictEqual(button.prop('aria-haspopup'), undefined)
      assert.strictEqual(button.prop('onClick'), popupStates[1].toggle)
      assert.strictEqual(popper.prop('id'), 'popper')
      assert.strictEqual(popper.prop('anchorEl'), buttonRef)
      assert.strictEqual(popper.prop('open'), true)
      assert.strictEqual(popper.prop('onClose'), undefined)

      button.simulate('click')
      wrapper.update()
      button = wrapper.find(Button)
      popper = wrapper.find(Popper)
      assert.strictEqual(popupStates[2].isOpen, false)
      assert.strictEqual(button.prop('aria-describedby'), null)
      assert.strictEqual(button.prop('aria-haspopup'), undefined)
      assert.strictEqual(button.prop('onClick'), popupStates[2].toggle)
      assert.strictEqual(popper.prop('id'), 'popper')
      assert.strictEqual(popper.prop('open'), false)
      assert.strictEqual(popper.prop('onClose'), undefined)
    })
  })
})
