import React from 'react'
import Typography from '@material-ui/core/Typography'
import Popover from '../HoverPopover'
import Button from '@material-ui/core/Button'
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
