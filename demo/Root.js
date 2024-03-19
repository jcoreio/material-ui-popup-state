import * as React from 'react'

import TriggerMenu from './examples/TriggerMenu'
import TriggerMenuCode from '!!raw-loader!./examples/TriggerMenu'
import TriggerMenuHooks from './examples/TriggerMenu.hooks'
import TriggerMenuHooksCode from '!!raw-loader!./examples/TriggerMenu.hooks'
import TriggerPopover from './examples/TriggerPopover'
import TriggerPopoverCode from '!!raw-loader!./examples/TriggerPopover'
import TriggerPopoverHooks from './examples/TriggerPopover.hooks'
import TriggerPopoverHooksCode from '!!raw-loader!./examples/TriggerPopover.hooks'
import ContextMenu from './examples/ContextMenu'
import ContextMenuCode from '!!raw-loader!./examples/ContextMenu'
import ContextMenuHooks from './examples/ContextMenu.hooks'
import ContextMenuHooksCode from '!!raw-loader!./examples/ContextMenu.hooks'
import HoverPopover from './examples/HoverPopover'
import HoverPopoverCode from '!!raw-loader!./examples/HoverPopover'
import HoverPopoverHooks from './examples/HoverPopover.hooks'
import HoverPopoverHooksCode from '!!raw-loader!./examples/HoverPopover.hooks'
import HoverPopperHooks from './examples/HoverPopper.hooks'
import HoverPopperHooksCode from '!!raw-loader!./examples/HoverPopper.hooks'
import FocusPopover from './examples/FocusPopover'
import FocusPopoverCode from '!!raw-loader!./examples/FocusPopover'
import FocusPopoverHooks from './examples/FocusPopover.hooks'
import FocusPopoverHooksCode from '!!raw-loader!./examples/FocusPopover.hooks'
import DoubleClickPopover from './examples/DoubleClickPopover'
import DoubleClickPopoverCode from '!!raw-loader!./examples/DoubleClickPopover'
import DoubleClickPopoverHooks from './examples/DoubleClickPopover.hooks'
import DoubleClickPopoverHooksCode from '!!raw-loader!./examples/DoubleClickPopover.hooks'
import HoverMenu from './examples/HoverMenu'
import HoverMenuCode from '!!raw-loader!./examples/HoverMenu'
import HoverMenuHooks from './examples/HoverMenu.hooks'
import HoverMenuHooksCode from '!!raw-loader!./examples/HoverMenu.hooks'
import HoverFocusMenu from './examples/HoverFocusMenu'
import HoverFocusMenuCode from '!!raw-loader!./examples/HoverFocusMenu'
import HoverFocusMenuHooks from './examples/HoverFocusMenu.hooks'
import HoverFocusMenuHooksCode from '!!raw-loader!./examples/HoverFocusMenu.hooks'
import CustomAnchorHooks from './examples/CustomAnchor.hooks'
import CustomAnchorHooksCode from '!!raw-loader!./examples/CustomAnchor.hooks'
import CascadingHoverMenus from './examples/CascadingHoverMenus'
import CascadingHoverMenusCode from '!!raw-loader!./examples/CascadingHoverMenus'
import CascadingHoverMenusHooks from './examples/CascadingHoverMenus.hooks'
import CascadingHoverMenusHooksCode from '!!raw-loader!./examples/CascadingHoverMenus.hooks'
import Dialog from './examples/Dialog'
import DialogCode from '!!raw-loader!./examples/Dialog'
import DialogHooks from './examples/Dialog.hooks'
import DialogHooksCode from '!!raw-loader!./examples/Dialog.hooks'
import ChainingEventHandlers from './examples/ChainingEventHandlers'
import ChainingEventHandlersCode from '!!raw-loader!./examples/ChainingEventHandlers'
import Demo from './Demo'
import Typography from '@mui/material/Typography'
import { withStyles } from '@mui/styles'
import { StyledEngineProvider } from '@mui/material/styles'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const theme = createTheme()

const styles = {
  root: {
    margin: '0 auto',
    maxWidth: 800,
  },
}

const Root = ({ classes }) => (
  <StyledEngineProvider>
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <Typography variant="h3">material-ui-popup-state demos</Typography>
        <Demo
          title="Left Click to open Menu"
          headerId="trigger-menu"
          example={<TriggerMenu />}
          code={TriggerMenuCode}
          hooksExample={<TriggerMenuHooks />}
          hooksCode={TriggerMenuHooksCode}
        />
        <Demo
          title="Left Click to open Popover"
          headerId="trigger-popover"
          example={<TriggerPopover />}
          code={TriggerPopoverCode}
          hooksExample={<TriggerPopoverHooks />}
          hooksCode={TriggerPopoverHooksCode}
        />
        <Demo
          title="Context Menu"
          headerId="trigger-menu"
          example={<ContextMenu />}
          code={ContextMenuCode}
          hooksExample={<ContextMenuHooks />}
          hooksCode={ContextMenuHooksCode}
        />
        <Demo
          title="Hover Popover"
          headerId="hover-popover"
          example={<HoverPopover />}
          code={HoverPopoverCode}
          hooksExample={<HoverPopoverHooks />}
          hooksCode={HoverPopoverHooksCode}
        />
        <Demo
          title="Hover Popper"
          headerId="hover-popper"
          hooksExample={<HoverPopperHooks />}
          hooksCode={HoverPopperHooksCode}
        />
        <Demo
          title="Focus Popover"
          headerId="focus-popover"
          example={<FocusPopover />}
          code={FocusPopoverCode}
          hooksExample={<FocusPopoverHooks />}
          hooksCode={FocusPopoverHooksCode}
        />
        <Demo
          title="Double Click Popper"
          headerId="double-click-popper"
          example={<DoubleClickPopover />}
          code={DoubleClickPopoverCode}
          hooksExample={<DoubleClickPopoverHooks />}
          hooksCode={DoubleClickPopoverHooksCode}
        />
        <Demo
          title="Hover Menu"
          headerId="hover-menu"
          example={<HoverMenu />}
          code={HoverMenuCode}
          hooksExample={<HoverMenuHooks />}
          hooksCode={HoverMenuHooksCode}
        />
        <Demo
          title="Hover/Focus Menu"
          headerId="HoverFocus-menu"
          example={<HoverFocusMenu />}
          code={HoverFocusMenuCode}
          hooksExample={<HoverFocusMenuHooks />}
          hooksCode={HoverFocusMenuHooksCode}
        />

        <Demo
          title="Custom Anchor"
          headerId="custom-anchor"
          hooksExample={<CustomAnchorHooks />}
          hooksCode={CustomAnchorHooksCode}
        />
        <Demo
          title="Cascading Hover Menus"
          headerId="cascading-hover-menus"
          example={<CascadingHoverMenus />}
          code={CascadingHoverMenusCode}
          hooksExample={<CascadingHoverMenusHooks />}
          hooksCode={CascadingHoverMenusHooksCode}
        />
        <Demo
          title="Dialog"
          headerId="dialog"
          example={<Dialog />}
          code={DialogCode}
          hooksExample={<DialogHooks />}
          hooksCode={DialogHooksCode}
        />
        <Demo
          title="Chaining Event Handlers"
          headerId="chaining-event-handlers"
          example={<ChainingEventHandlers />}
          code={ChainingEventHandlersCode}
        />
      </div>
    </ThemeProvider>
  </StyledEngineProvider>
)

export default withStyles(styles)(Root)
