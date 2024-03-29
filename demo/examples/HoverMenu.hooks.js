import * as React from 'react'
import HoverMenu from 'material-ui-popup-state/HoverMenu'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import {
  usePopupState,
  bindHover,
  bindMenu,
} from 'material-ui-popup-state/hooks'

const MenuPopupState = () => {
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'demoMenu',
  })
  return (
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
  )
}

export default MenuPopupState
