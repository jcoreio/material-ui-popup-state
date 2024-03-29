import React from 'react'
import Typography from '@mui/material/Typography'
import Popover from '@mui/material/Popover'
import Button from '@mui/material/Button'
import {
  usePopupState,
  bindDoubleClick,
  bindPopover,
} from 'material-ui-popup-state/hooks'

const DoubleClickPopperPopupState = ({ classes }) => {
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'demoPopover',
  })

  return (
    <div>
      <Button {...bindDoubleClick(popupState)} variant="contained">
        Double click to open Popper
      </Button>
      <Popover
        {...bindPopover(popupState)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Typography style={{ margin: 10 }}>
          The content of the Popover.
        </Typography>
      </Popover>
    </div>
  )
}

export default DoubleClickPopperPopupState
