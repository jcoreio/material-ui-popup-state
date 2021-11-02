import React from 'react'
import Typography from '@mui/material/Typography'
import Popover from '@mui/material/Popover'
import Button from '@mui/material/Button'
import PopupState, {
  bindDoubleClick,
  bindPopper,
} from 'material-ui-popup-state'
import { ClickAwayListener } from '@mui/material'

const DoubleClickPoperPopupState = ({ classes }) => (
  <PopupState variant="popover" popupId="demoPopover">
    {(popupState) => (
      <ClickAwayListener onClickAway={popupState.close}>
        <Button {...bindDoubleClick(popupState)} variant="text">
          Double click to open poper
        </Button>
        <Popover
          {...bindPopper(popupState)}
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
      </ClickAwayListener>
    )}
  </PopupState>
)

export default DoubleClickPoperPopupState
