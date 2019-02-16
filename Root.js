import * as React from 'react'

import ToggleMenu from './examples/ToggleMenu'
import ToggleMenuCode from '!!raw-loader!./examples/ToggleMenu'
import TogglePopover from './examples/TogglePopover'
import TogglePopoverCode from '!!raw-loader!./examples/TogglePopover'
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
    <Demo title="Toggle Menu" example={<ToggleMenu />} code={ToggleMenuCode} />
    <Demo
      title="Toggle Popover"
      example={<TogglePopover />}
      code={TogglePopoverCode}
    />
    <Demo
      title="Hover Popover"
      example={<HoverPopover />}
      code={HoverPopoverCode}
    />
    <Demo title="Hover Menu" example={<HoverMenu />} code={HoverMenuCode} />
    <Demo
      title="Cascading Hover Menus"
      example={<CascadingHoverMenus />}
      code={CascadingHoverMenusCode}
    />
  </div>
)

export default withStyles(styles)(Root)
