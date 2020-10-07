import * as React from 'react'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import PopupState, { bindContextMenu, bindMenu } from 'material-ui-popup-state'

const ContextMenu = () => (
  <PopupState variant="popover" popupId="demoMenu">
    {popupState => (
      <div>
        <Button variant="contained" {...bindContextMenu(popupState)}>
          Right Click to Open Menu
        </Button>
        <Menu
          {...bindMenu(popupState)}
          getContentAnchorEl={null}
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
