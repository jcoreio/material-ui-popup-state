import * as React from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state'

const TriggerMenu = () => (
  <PopupState variant="popover" popupId="demoMenu">
    {(popupState) => (
      <div>
        <Button variant="contained" {...bindTrigger(popupState)}>
          Open Menu
        </Button>
        <Menu
          {...bindMenu(popupState)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        >
          <MenuItem onClick={popupState.close}>Cake</MenuItem>
          <MenuItem onClick={popupState.close}>Death</MenuItem>
        </Menu>
      </div>
    )}
  </PopupState>
)

export default TriggerMenu
