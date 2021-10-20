import React from 'react'
import Typography from '@mui/material/Typography'
import Popover from '@mui/material/Popover'
import Input from '@mui/material/Input'
import {
  usePopupState,
  bindFocus,
  bindPopover,
} from 'material-ui-popup-state/hooks'

const FocusPopoverPopupState = ({ classes }) => {
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'demoPopover',
  })
  return (
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
  )
}

export default FocusPopoverPopupState
