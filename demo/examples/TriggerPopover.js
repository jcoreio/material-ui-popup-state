import React from 'react'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Popover from '@mui/material/Popover'
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state'

const TriggerPopover = () => (
  <PopupState variant="popover" popupId="demoPopover">
    {(popupState) => (
      <div>
        <Button variant="contained" {...bindTrigger(popupState)}>
          Open Popover
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
          <Typography sx={{ margin: 2 }}>
            The content of the Popover.
          </Typography>
        </Popover>
      </div>
    )}
  </PopupState>
)

export default TriggerPopover
