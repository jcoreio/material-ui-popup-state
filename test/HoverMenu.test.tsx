import * as React from 'react'
import Menu from '../HoverMenu'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import PopupState, { bindHover, bindMenu } from '../'

const MenuPopupState = () => (
  <PopupState variant="popover" popupId="demoMenu">
    {popupState => (
      <React.Fragment>
        <Button variant="contained" {...bindHover(popupState)}>
          Hover to open Menu
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
      </React.Fragment>
    )}
  </PopupState>
)

export default MenuPopupState
