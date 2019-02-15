/**
 * @flow
 * @prettier
 */

import * as React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Popover from '@material-ui/core/Popover'

const styles = {
  _modalRoot: {
    pointerEvents: 'none',
  },
  paper: {
    pointerEvents: 'auto',
  },
}

export type HoverPopoverProps = React.ElementConfig<typeof Popover>

const HoverPopover = ({
  classes: { _modalRoot, ...classes },
  ModalClasses,
  ...props
}: HoverPopoverProps): React.Node => (
  <Popover
    classes={classes}
    ModalClasses={{
      ...ModalClasses,
      root:
        ModalClasses && ModalClasses.root
          ? `${ModalClasses.root} ${_modalRoot}`
          : _modalRoot,
    }}
    {...props}
  />
)

export default withStyles(styles)(HoverPopover)
