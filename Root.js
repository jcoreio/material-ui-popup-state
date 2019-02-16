import * as React from 'react'

import TriggerMenu from './examples/TriggerMenu'
import TriggerMenuCode from '!!raw-loader!./examples/TriggerMenu'
import TriggerPopover from './examples/TriggerPopover'
import TriggerPopoverCode from '!!raw-loader!./examples/TriggerPopover'
import HoverPopover from './examples/HoverPopover'
import HoverPopoverCode from '!!raw-loader!./examples/HoverPopover'
import HoverMenu from './examples/HoverMenu'
import HoverMenuCode from '!!raw-loader!./examples/HoverMenu'
import CascadingHoverMenus from './examples/CascadingHoverMenus'
import CascadingHoverMenusCode from '!!raw-loader!./examples/CascadingHoverMenus'
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
    />
    <Demo
      title="Trigger Popover"
      headerId="trigger-popover"
      example={<TriggerPopover />}
      code={TriggerPopoverCode}
    />
    <Demo
      title="Hover Popover"
      headerId="hover-popover"
      example={<HoverPopover />}
      code={HoverPopoverCode}
    />
    <Demo
      title="Hover Menu"
      headerId="hover-menu"
      example={<HoverMenu />}
      code={HoverMenuCode}
    />
    <Demo
      title="Cascading Hover Menus"
      headerId="cascading-hover-menus"
      example={<CascadingHoverMenus />}
      code={CascadingHoverMenusCode}
    />
  </div>
)

export default withStyles(styles)(Root)
