import * as React from 'react'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import PopupState, {
  anchorRef,
  bindTrigger,
  bindMenu,
} from 'material-ui-popup-state'

const CustomAnchor = () => (
  <PopupState variant="popover" popupId="demoMenu">
    {(popupState) => (
      <div>
        <Typography variant="h6">
          In this example the menu gets anchored to the <code>ListItem</code>{' '}
          instead of the <code>IconButton</code> that triggers it. This is
          accomplished by passing the following to the <code>ListItem</code>:
          <pre>{'ContainerProps={{ ref: anchorRef(popupState) }}'}</pre>
        </Typography>

        <Paper>
          <List>
            <ListItem button ContainerProps={{ ref: anchorRef(popupState) }}>
              <ListItemText
                primary="Stuff"
                secondary="Last Modified Apr 9, 2019"
              />
              <ListItemSecondaryAction>
                <IconButton {...bindTrigger(popupState)}>
                  <MoreVertIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </Paper>
        <Menu
          {...bindMenu(popupState)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MenuItem onClick={popupState.close}>Move</MenuItem>
          <MenuItem onClick={popupState.close}>Rename</MenuItem>
          <MenuItem onClick={popupState.close}>Delete</MenuItem>
        </Menu>
      </div>
    )}
  </PopupState>
)

export default CustomAnchor
