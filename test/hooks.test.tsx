import * as React from 'react'
import { assert } from 'chai'
import {
  cleanup,
  render,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
  screen,
  waitForOptions,
} from '@testing-library/react'
import {
  Button,
  Input,
  Popper,
  Popover,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
} from '@mui/material'
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
  PopupState,
  bindDoubleClick,
  bindDialog,
} from '../src/hooks'
import { afterEach, beforeEach, describe, it } from 'mocha'
import sinon from 'sinon'
import HoverMenu from '../src/HoverMenu'

const waitForTruthy = (cb: () => any, opts?: waitForOptions) =>
  waitFor(() => {
    if (cb()) return
    throw new Error('not true')
  }, opts)

/* eslint-disable react/jsx-handler-names */

let consoleError: sinon.SinonSpy<
  Parameters<(typeof console)['error']>,
  void
  // eslint-disable-next-line no-console
> = console.error as any

beforeEach(() => {
  sinon.spy(console, 'error')
  // eslint-disable-next-line no-console
  consoleError = console.error as any
})

afterEach(() => {
  cleanup()
  consoleError.restore()
})

describe('usePopupState', () => {
  describe('bindMenu/bindTrigger', () => {
    let buttonRef: any
    let button
    let menu

    const popupStates: PopupState[] = []

    beforeEach(() => (popupStates.length = 0))

    const MenuTest = ({
      popupId = null,
    }: {
      popupId?: string | null
    }): React.ReactElement => {
      const popupState = usePopupState({ popupId, variant: 'popover' })
      popupStates.push(popupState)
      return (
        <React.Fragment>
          <Button {...bindTrigger(popupState)} ref={(c) => (buttonRef = c)}>
            Open Menu
          </Button>
          <Menu data-testid="menu" {...bindMenu(popupState)}>
            <MenuItem
              data-testid="menuitem"
              onTouchStart={popupState.close}
              onClick={popupState.close}
            >
              Test
            </MenuItem>
          </Menu>
        </React.Fragment>
      )
    }

    it('passes correct props to bindTrigger/bindMenu', async () => {
      render(<MenuTest popupId="menu" />)
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

    it('open/close with touch events works', async () => {
      render(<MenuTest popupId="menu" />)
      assert.strictEqual(popupStates[0].isOpen, false)
      button = screen.getByRole('button')
      menu = screen.queryByTestId('menu')
      assert.strictEqual(button.getAttribute('aria-controls'), null)
      assert.strictEqual(button.getAttribute('aria-haspopup'), 'true')
      assert.strictEqual(menu, null)

      fireEvent.touchStart(button)
      fireEvent.click(button)
      await waitForTruthy(() => screen.queryByTestId('menu'))
      menu = screen.getByTestId('menu')
      assert.strictEqual(popupStates[popupStates.length - 1].isOpen, true)
      assert.strictEqual(button.getAttribute('aria-controls'), 'menu')
      assert.strictEqual(button.getAttribute('aria-haspopup'), 'true')
      assert.strictEqual(menu.getAttribute('id'), 'menu')

      await Promise.all([
        waitForElementToBeRemoved(menu),
        (() => {
          fireEvent.touchStart(screen.getByTestId('menuitem'))
          fireEvent.click(screen.getByTestId('menuitem'))
        })(),
      ])
      assert.strictEqual(popupStates[popupStates.length - 1].isOpen, false)
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
    it('open warns if not passed an anchor element', async () => {
      render(<MenuTest />)

      await waitForTruthy(() => popupStates[0])
      popupStates[0].open()
      popupStates[popupStates.length - 1].close()
      popupStates[popupStates.length - 1].open()

      assert.deepEqual(consoleError.args, [
        [
          '[material-ui-popup-state] WARNING',
          'eventOrAnchorEl should be defined if setAnchorEl is not used',
        ],
      ])
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
      render(<MenuTest />)

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

    const MenuTest = (): React.ReactElement => {
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

      fireEvent.contextMenu(button, {
        clientX: 100,
        clientY: 200,
        screenX: 100,
        screenY: 200,
      })
      menu = screen.getByTestId('menu')
      assert.strictEqual(button.getAttribute('aria-controls'), 'menu')
      assert.strictEqual(button.getAttribute('aria-haspopup'), 'true')
      assert.strictEqual(menu.getAttribute('id'), 'menu')
      const parent = menu.querySelector('ul')?.parentElement
      if (!parent) throw new Error('failed to get parent element')
      const { left, top } = getComputedStyle(parent)
      assert.strictEqual(left, '100px')
      assert.strictEqual(top, '200px')

      await Promise.all([
        waitForElementToBeRemoved(menu),
        fireEvent.click(screen.getByTestId('menuitem')),
      ])
      assert.strictEqual(button.getAttribute('aria-controls'), null)
      assert.strictEqual(button.getAttribute('aria-haspopup'), 'true')
    })
  })
  describe('bindMenu/bindDoubleClick', () => {
    let button
    let menu

    const MenuTest = (): React.ReactElement => {
      const popupState = usePopupState({ popupId: 'menu', variant: 'popover' })
      return (
        <React.Fragment>
          <Button {...bindDoubleClick(popupState)}>Open Menu</Button>
          <Menu data-testid="menu" {...bindMenu(popupState)}>
            <MenuItem data-testid="menuitem" onClick={popupState.close}>
              Test
            </MenuItem>
          </Menu>
        </React.Fragment>
      )
    }

    it('passes correct props to bindDoubleClick/bindMenu', async () => {
      render(<MenuTest />)
      button = screen.getByRole('button')
      menu = screen.queryByTestId('menu')
      assert.strictEqual(button.getAttribute('aria-controls'), null)
      assert.strictEqual(button.getAttribute('aria-haspopup'), 'true')
      assert.strictEqual(menu, null)

      fireEvent.click(button)
      assert.strictEqual(screen.queryByTestId('menu'), null)
      fireEvent.doubleClick(button)
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

  describe('bindDialog/bindTrigger', () => {
    let button
    let dialog

    const popupStates: PopupState[] = []

    beforeEach(() => (popupStates.length = 0))

    const DialogTest = (): React.ReactElement => {
      const popupState = usePopupState({ variant: 'dialog' })
      popupStates.push(popupState)
      return (
        <React.Fragment>
          <Button {...bindTrigger(popupState)}>Open Dialog</Button>
          <Dialog data-testid="dialog" {...bindDialog(popupState)}>
            <DialogTitle>Test</DialogTitle>
          </Dialog>
        </React.Fragment>
      )
    }

    it('passes correct props to bindTrigger/bindDialog', async () => {
      render(<DialogTest />)
      assert.strictEqual(popupStates[0].isOpen, false)
      button = screen.getByRole('button')
      dialog = screen.queryByTestId('dialog')
      assert.strictEqual(dialog, null)

      fireEvent.click(button)
      dialog = screen.getByTestId('dialog')
      assert.strictEqual(popupStates[1].isOpen, true)
      const backdrop = document.querySelector('.MuiBackdrop-root')
      if (!backdrop) throw new Error(`failed to find backdrop element`)

      await Promise.all([
        waitForElementToBeRemoved(dialog),
        fireEvent.click(backdrop),
      ])
      assert.strictEqual(popupStates[2].isOpen, false)
    })
  })

  describe('bindPopover/bindFocus', () => {
    let input
    let popover

    const MenuTest = (): React.ReactElement => {
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

    function TestComp(): React.ReactElement {
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

    const MenuTest = (): React.ReactElement => {
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
    ] as ('focus' | 'mouseOver' | 'blur' | 'mouseLeave')[][]) {
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

    const MenuTest = (): React.ReactElement => {
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

    const PopperTest = (): React.ReactElement => {
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
      render(<PopperTest />)
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
  describe('cascading hover menus', function () {
    const CascadingContext = React.createContext<{
      parentPopupState: PopupState | null
      rootPopupState: PopupState | null
    }>({
      parentPopupState: null,
      rootPopupState: null,
    })

    function CascadingMenuItem({
      onClick,
      ...props
    }: React.ComponentProps<typeof MenuItem>) {
      const { rootPopupState } = React.useContext(CascadingContext)
      if (!rootPopupState)
        throw new Error('must be used inside a CascadingMenu')
      const handleClick = React.useCallback<
        NonNullable<React.ComponentProps<typeof MenuItem>['onClick']>
      >(
        (event) => {
          rootPopupState.close(event)
          if (onClick) onClick(event)
        },
        [rootPopupState, onClick]
      )

      return (
        <MenuItem
          {...props}
          onClick={handleClick}
          data-testid={String(props.children)}
        />
      )
    }

    function CascadingSubmenu({
      title,
      popupId,
      ...props
    }: Omit<React.ComponentProps<typeof CascadingMenu>, 'popupState'> & {
      title: React.ReactNode
      popupId?: string
    }) {
      const { parentPopupState } = React.useContext(CascadingContext)
      const popupState = usePopupState({
        popupId,
        variant: 'popover',
        parentPopupState,
      })
      return (
        <React.Fragment>
          <MenuItem
            data-testid={title}
            {...bindHover(popupState)}
            {...bindFocus(popupState)}
          >
            {title}
          </MenuItem>
          <CascadingMenu
            {...props}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            popupState={popupState}
          />
        </React.Fragment>
      )
    }

    function CascadingMenu({
      popupState,
      ...props
    }: Omit<React.ComponentProps<typeof HoverMenu>, 'open'> & {
      popupState: PopupState
    }) {
      const { rootPopupState } = React.useContext(CascadingContext)
      const context = React.useMemo(
        () => ({
          rootPopupState: rootPopupState || popupState,
          parentPopupState: popupState,
        }),
        [rootPopupState, popupState]
      )

      return (
        <CascadingContext.Provider value={context}>
          <HoverMenu {...props} {...bindMenu(popupState)} />
        </CascadingContext.Provider>
      )
    }

    const CascadingHoverMenus = () => {
      const popupState = usePopupState({
        popupId: 'rootMenu',
        variant: 'popover',
      })
      return (
        <div style={{ height: 600 }}>
          <Button
            variant="contained"
            {...bindHover(popupState)}
            {...bindFocus(popupState)}
          >
            Hover to open Menu
          </Button>
          <CascadingMenu
            popupState={popupState}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          >
            <CascadingMenuItem>Tea</CascadingMenuItem>
            <CascadingMenuItem>Cake</CascadingMenuItem>
            <CascadingMenuItem>Death</CascadingMenuItem>
            <CascadingSubmenu
              popupId="moreChoicesCascadingMenu"
              title="More Choices"
            >
              <CascadingMenuItem>Cheesecake</CascadingMenuItem>
              <CascadingMenuItem>Cheesedeath</CascadingMenuItem>
              <CascadingSubmenu
                popupId="evenMoreChoicesCascadingMenu"
                title="Even More Choices"
              >
                <CascadingMenuItem>Cake (the band)</CascadingMenuItem>
                <CascadingMenuItem>Death Metal</CascadingMenuItem>
              </CascadingSubmenu>
              <CascadingSubmenu
                popupId="moreBenignChoices"
                title="More Benign Choices"
              >
                <CascadingMenuItem>Salad</CascadingMenuItem>
                <CascadingMenuItem>Lobotomy</CascadingMenuItem>
              </CascadingSubmenu>
            </CascadingSubmenu>
          </CascadingMenu>
        </div>
      )
    }

    it('passes correct props to bindTrigger/bindMenu', async () => {
      let menu

      render(<CascadingHoverMenus />)
      const button = screen.getByRole('button')
      menu = document.getElementById('rootMenu')
      assert.strictEqual(button.getAttribute('aria-controls'), null)
      assert.strictEqual(button.getAttribute('aria-haspopup'), 'true')
      assert.strictEqual(menu, null)

      fireEvent.mouseOver(button)
      menu = document.getElementById('rootMenu')
      assert.exists(menu)
      assert.exists(screen.queryByTestId('Tea'))
      assert.exists(screen.queryByTestId('Cake'))
      assert.exists(screen.queryByTestId('Death'))
      assert.exists(screen.queryByTestId('More Choices'))
      assert.notExists(screen.queryByTestId('Cheesecake'))

      fireEvent.mouseOver(screen.getByTestId('More Choices'))
      assert.exists(screen.queryByTestId('Cheesecake'))
      assert.exists(screen.queryByTestId('Cheesedeath'))
      assert.exists(screen.queryByTestId('Even More Choices'))

      fireEvent.mouseOver(screen.getByTestId('Even More Choices'))
      assert.exists(screen.getByTestId('Cake (the band)'))
      assert.exists(screen.getByTestId('Death Metal'))

      fireEvent.mouseLeave(
        screen.getByTestId('Death Metal').closest('.MuiMenu-root')!
      )
      await new Promise((r) => setTimeout(r, 30))
      assert.notExists(screen.queryByTestId('Cake (the band)'))
      assert.notExists(screen.queryByTestId('Death Metal'))
      assert.notExists(screen.queryByTestId('Cheesecake'))
      assert.notExists(screen.queryByTestId('Cheesedeath'))
      assert.notExists(screen.queryByTestId('Tea'))
      assert.notExists(screen.queryByTestId('Cake'))
      assert.notExists(screen.queryByTestId('Death'))
    })
  })
})
