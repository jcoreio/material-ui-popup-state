import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import {
  usePopupState,
  bindTrigger,
  bindDialog,
} from 'material-ui-popup-state/hooks'

const DialogPopupState = () => {
  const popupState = usePopupState({
    variant: 'dialog',
  })
  return (
    <React.Fragment>
      <Button variant="contained" {...bindTrigger(popupState)}>
        Open Dialog
      </Button>
      <Dialog
        {...bindDialog(popupState)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={popupState.close}>Disagree</Button>
          <Button onClick={popupState.close} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

export default DialogPopupState
