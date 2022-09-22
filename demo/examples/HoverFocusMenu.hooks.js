import * as React from 'react'
import HoverMenu from 'material-ui-popup-state/HoverMenu'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import {
  usePopupState,
  bindFocus,
  bindHover,
  bindMenu,
} from 'material-ui-popup-state/hooks'

const HoverFocusMenu = () => {
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'demoMenu',
  })
  return (
    <React.Fragment>
      <Button
        variant="contained"
        {...bindHover(popupState)}
        {...bindFocus(popupState)}
      >
        Hover or focus to open Menu
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

export default HoverFocusMenu
