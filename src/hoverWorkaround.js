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
        style={{ pointerEvents: 'none', ...style }}
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
  )

  return withStyles(styles)(HoverWorkaround)
}
