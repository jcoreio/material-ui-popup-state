/**
 * @flow
 * @prettier
 */

import * as React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Menu from '@material-ui/core/Menu'

const styles = {
  _modalRoot: {
    pointerEvents: 'none',
  },
  paper: {
    pointerEvents: 'auto',
  },
}

export type HoverMenuProps = React.ElementConfig<typeof Menu>

const HoverMenu = ({
  classes: { _modalRoot, ...classes },
  ModalClasses,
  ...props
}: HoverMenuProps): React.Node => (
  <Menu
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

export default withStyles(styles)(HoverMenu)
