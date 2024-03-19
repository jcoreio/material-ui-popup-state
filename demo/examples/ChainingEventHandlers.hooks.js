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
import { useChainEventHandlers } from 'material-ui-popup-state/useChainEventHandlers'

const DialogPopupState = () => {
  const popupState = usePopupState({ variant: 'dialog' })
  const boundDialogProps = useChainEventHandlers(
    bindDialog(popupState),
    { onClose: () => setTimeout(() => alert('closed dialog!'), 10) },
    [popupState]
  )
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
          <Button onClick={popupState.close}>Cancel</Button>
          <Button onClick={popupState.close} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

export default DialogPopupState
