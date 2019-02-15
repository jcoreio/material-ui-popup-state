import * as React from 'react'
import Menu from 'material-ui-popup-state/HoverMenu'
import MenuItem from '@material-ui/core/MenuItem'
import PopupState, { bindHover, bindMenu } from 'material-ui-popup-state'
import Typography from '@material-ui/core/Typography'

const MenuPopupState = () => (
  <PopupState variant="popover" popupId="demoMenu">
    {popupState => (
      <React.Fragment>
        <Typography {...bindHover(popupState)}>Hover with a Menu.</Typography>
        <Menu {...bindMenu(popupState)}>
          <MenuItem onClick={popupState.close}>Cake</MenuItem>
          <MenuItem onClick={popupState.close}>Death</MenuItem>
        </Menu>
      </React.Fragment>
    )}
  </PopupState>
)

export default MenuPopupState
