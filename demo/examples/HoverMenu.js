import * as React from 'react'
import HoverMenu from 'material-ui-popup-state/HoverMenu'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import PopupState, { bindHover, bindMenu } from 'material-ui-popup-state'

const MenuPopupState = () => (
  <PopupState variant="popover" popupId="demoMenu" disableAutoFocus>
    {(popupState) => (
      <React.Fragment>
        <Button variant="contained" {...bindHover(popupState)}>
          Hover to open Menu
        </Button>
        <HoverMenu
          {...bindMenu(popupState)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        >
          <MenuItem onClick={popupState.close}>Cake</MenuItem>
          <MenuItem onClick={popupState.close}>Death</MenuItem>
        </HoverMenu>
      </React.Fragment>
    )}
  </PopupState>
)

export default MenuPopupState
