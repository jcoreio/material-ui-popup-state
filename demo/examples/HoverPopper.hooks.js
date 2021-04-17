import React from 'react'
import Typography from '@material-ui/core/Typography'
import Popper from '@material-ui/core/Popper'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import {
  usePopupState,
  bindHover,
  bindPopper,
} from 'material-ui-popup-state/hooks'

const HoverPopperPopupState = ({ classes }) => {
  const popupState = usePopupState({
    variant: 'popper',
    popupId: 'demoPopper',
  })
  return (
    <div>
      <Button variant="contained" {...bindHover(popupState)}>
        Hover to open Popper
      </Button>
      <Popper {...bindPopper(popupState)} transition>
        <Paper>
          <Typography style={{ margin: 10 }}>
            The content of the Popper.
          </Typography>
        </Paper>
      </Popper>
    </div>
  )
}

export default HoverPopperPopupState
