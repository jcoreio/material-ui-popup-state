import * as React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'

const styles = {
  _modalRoot: {
    pointerEvents: 'none',
  },
  paper: {
    pointerEvents: 'auto',
  },
}

export default function hoverWorkaround(Comp) {
  const HoverWorkaround = ({
    classes: { _modalRoot, ...classes },
    ModalClasses,
    ...props
  }) => (
    <Comp
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

  return withStyles(styles)(HoverWorkaround)
}
