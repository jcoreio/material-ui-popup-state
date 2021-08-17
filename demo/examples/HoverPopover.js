import React from 'react'
import Typography from '@material-ui/core/Typography'
import HoverPopover from 'material-ui-popup-state/HoverPopover'
import Button from '@material-ui/core/Button'
import PopupState, { bindHover, bindPopover } from 'material-ui-popup-state'

const HoverPopoverPopupState = ({ classes }) => (
  <PopupState variant="popover" popupId="demoPopover">
    {(popupState) => (
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
    )}
  </PopupState>
)

export default HoverPopoverPopupState
