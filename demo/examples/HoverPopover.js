import React from 'react'
import Typography from '@material-ui/core/Typography'
import Popover from 'material-ui-popup-state/HoverPopover'
import PopupState, { bindHover, bindPopover } from 'material-ui-popup-state'

const HoverPopoverPopupState = ({ classes }) => (
  <PopupState variant="popover" popupId="demoPopover">
    {popupState => (
      <div>
        <Typography {...bindHover(popupState)}>
          Hover with a Popover.
        </Typography>
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
