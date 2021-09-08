import React from 'react'
import Typography from '@mui/material/Typography'
import Popover from '@mui/material/Popover'
import Input from '@mui/material/Input'
import PopupState, { bindFocus, bindPopover } from 'material-ui-popup-state'

const FocusPopoverPopupState = ({ classes }) => (
  <PopupState variant="popover" popupId="demoPopover">
    {(popupState) => (
      <div>
        <Input {...bindFocus(popupState)} placeholder="Focus to open Popover" />
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
    )}
  </PopupState>
)

export default FocusPopoverPopupState
