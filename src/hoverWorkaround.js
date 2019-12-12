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
  const HoverWorkaround = React.forwardRef(
    (
      { classes: { _modalRoot, ...classes }, ModalClasses, style, ...props },
      ref
    ) => (
      <Comp
        ref={ref}
        classes={classes}
        className={_modalRoot}
        style={{ pointerEvents: 'none', ...style }}
        {...props}
      />
    )
  )
  return withStyles(styles)(HoverWorkaround)
}
