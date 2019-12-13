import React from 'react'
import Typography from '@material-ui/core/Typography'
import Popover from '../HoverPopover'
import Button from '@material-ui/core/Button'
import PopupState, { bindHover, bindPopover } from '../'

const HoverPopoverPopupState = () => (
  <PopupState variant="popover" popupId="demoPopover">
    {popupState => (
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
    )}
  </PopupState>
)

export default HoverPopoverPopupState
