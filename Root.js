import * as React from 'react'

import TriggerMenu from './examples/TriggerMenu'
import TriggerMenuCode from '!!raw-loader!./examples/TriggerMenu'
import TriggerMenuHooks from './examples/TriggerMenu.hooks'
import TriggerMenuHooksCode from '!!raw-loader!./examples/TriggerMenu.hooks'
import TriggerPopover from './examples/TriggerPopover'
import TriggerPopoverCode from '!!raw-loader!./examples/TriggerPopover'
import TriggerPopoverHooks from './examples/TriggerPopover.hooks'
import TriggerPopoverHooksCode from '!!raw-loader!./examples/TriggerPopover.hooks'
import HoverPopover from './examples/HoverPopover'
import HoverPopoverCode from '!!raw-loader!./examples/HoverPopover'
import HoverPopoverHooks from './examples/HoverPopover.hooks'
import HoverPopoverHooksCode from '!!raw-loader!./examples/HoverPopover.hooks'
import HoverMenu from './examples/HoverMenu'
import HoverMenuCode from '!!raw-loader!./examples/HoverMenu'
import HoverMenuHooks from './examples/HoverMenu.hooks'
import HoverMenuHooksCode from '!!raw-loader!./examples/HoverMenu.hooks'
import CascadingHoverMenus from './examples/CascadingHoverMenus'
import CascadingHoverMenusCode from '!!raw-loader!./examples/CascadingHoverMenus'
import CascadingHoverMenusHooks from './examples/CascadingHoverMenus.hooks'
import CascadingHoverMenusHooksCode from '!!raw-loader!./examples/CascadingHoverMenus.hooks'
import Demo from './Demo'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'

const styles = {
  root: {
    margin: '0 auto',
    maxWidth: 800,
  },
}

const Root = ({ classes }) => (
  <div className={classes.root}>
    <Typography variant="h3">material-ui-popup-state demos</Typography>
    <Demo
      title="Trigger Menu"
      headerId="trigger-menu"
      example={<TriggerMenu />}
      code={TriggerMenuCode}
      hooksExample={<TriggerMenuHooks />}
      hooksCode={TriggerMenuHooksCode}
    />
    <Demo
      title="Trigger Popover"
      headerId="trigger-popover"
      example={<TriggerPopover />}
      code={TriggerPopoverCode}
      hooksExample={<TriggerPopoverHooks />}
      hooksCode={TriggerPopoverHooksCode}
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
      title="Hover Menu"
      headerId="hover-menu"
      example={<HoverMenu />}
      code={HoverMenuCode}
      hooksExample={<HoverMenuHooks />}
      hooksCode={HoverMenuHooksCode}
    />
    <Demo
      title="Cascading Hover Menus"
      headerId="cascading-hover-menus"
      example={<CascadingHoverMenus />}
      code={CascadingHoverMenusCode}
      hooksExample={<CascadingHoverMenusHooks />}
      hooksCode={CascadingHoverMenusHooksCode}
    />
  </div>
)

export default withStyles(styles)(Root)
