import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@mui/styles'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Popover from '@mui/material/Popover'
import {
  usePopupState,
  bindTrigger,
  bindPopover,
} from 'material-ui-popup-state/hooks'

const styles = (theme) => ({
  typography: {
    margin: theme.spacing(2),
  },
})

const TriggerPopover = ({ classes }) => {
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'demoPopover',
  })
  return (
    <div>
      <Button variant="contained" {...bindTrigger(popupState)}>
        Open Popover
      </Button>
      <Popover
        {...bindPopover(popupState)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Typography className={classes.typography}>
          The content of the Popover.
        </Typography>
      </Popover>
    </div>
  )
}

TriggerPopover.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(TriggerPopover)
