import React from 'react'
import Typography from '@mui/material/Typography'
import Popover from '../HoverPopover'
import Button from '@mui/material/Button'
import { usePopupState, bindHover, bindPopover } from '../hooks'

const HoverPopoverPopupState = () => {
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'demoPopover',
  })
  return (
    <div>
      <Button variant="contained" {...bindHover(popupState)}>
        Hover to open Popover
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
        disableRestoreFocus
      >
        <Typography style={{ margin: 10 }}>
          The content of the Popover.
        </Typography>
      </Popover>
    </div>
  )
}

export default HoverPopoverPopupState
