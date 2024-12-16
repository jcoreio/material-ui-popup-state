import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import PopupState, { bindTrigger, bindDialog } from 'material-ui-popup-state'
import { chainEventHandlers } from 'material-ui-popup-state/chainEventHandlers'

const DialogPopupState = () => (
  <PopupState variant="dialog">
    {(popupState) => {
      const boundDialogProps = chainEventHandlers(bindDialog(popupState), {
        onClose: () => setTimeout(() => alert('closed dialog!'), 10),
      })
      return (
        <React.Fragment>
          <Button variant="contained" {...bindTrigger(popupState)}>
            Open Dialog
          </Button>
          <Dialog
            {...boundDialogProps}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              Chaining Event Handlers example
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                After you close this dialog, you should get an alert
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={boundDialogProps.onClose}>Cancel</Button>
              <Button onClick={boundDialogProps.onClose} autoFocus>
                OK
              </Button>
            </DialogActions>
          </Dialog>
        </React.Fragment>
      )
    }}
  </PopupState>
)

export default DialogPopupState
