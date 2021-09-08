import * as React from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import PopupState, { bindContextMenu, bindMenu } from 'material-ui-popup-state'

const ContextMenu = () => (
  <PopupState variant="popover" popupId="demoMenu">
    {(popupState) => (
      <div>
        <Button variant="contained" {...bindContextMenu(popupState)}>
          Right Click to Open Menu
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

export default ContextMenu
