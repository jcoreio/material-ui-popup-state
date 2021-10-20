import React from 'react'
import Typography from '@mui/material/Typography'
import Popper from '@mui/material/Popper'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
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
      <Popper {...bindPopper(popupState)} placement="bottom">
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
