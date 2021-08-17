import React from 'react'
import Typography from '@material-ui/core/Typography'
import HoverPopover from 'material-ui-popup-state/HoverPopover'
import Button from '@material-ui/core/Button'
import {
  usePopupState,
  bindHover,
  bindPopover,
} from 'material-ui-popup-state/hooks'

const HoverPopoverPopupState = ({ classes }) => {
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'demoPopover',
  })
  return (
    <div>
      <Button variant="contained" {...bindHover(popupState)}>
        Hover to open Popover
      </Button>
      <HoverPopover
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
      </HoverPopover>
    </div>
  )
}

export default HoverPopoverPopupState
