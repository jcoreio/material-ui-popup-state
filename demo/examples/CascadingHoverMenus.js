import * as React from 'react'
import { makeStyles } from '@material-ui/styles'
import MenuItem from '@mui/material/MenuItem'
import ChevronRight from '@material-ui/icons/ChevronRight'
import Button from '@mui/material/Button'
import PopupState, { bindHover, bindMenu } from 'material-ui-popup-state'
import HoverMenu from 'material-ui-popup-state/HoverMenu'

const useCascadingMenuStyles = makeStyles((theme) => ({
  submenu: {
    marginTop: theme.spacing(-1),
  },
  title: {
    flexGrow: 1,
  },
  moreArrow: {
    marginRight: theme.spacing(-1),
  },
}))

const CascadingContext = React.createContext({
  parentPopupState: null,
  rootPopupState: null,
})

function CascadingMenuItem({ onClick, ...props }) {
  const { rootPopupState } = React.useContext(CascadingContext)
  if (!rootPopupState) throw new Error('must be used inside a CascadingMenu')
  const handleClick = React.useCallback(
    (event) => {
      rootPopupState.close(event)
      if (onClick) onClick(event)
    },
    [rootPopupState, onClick]
  )

  return <MenuItem {...props} onClick={handleClick} />
}

function CascadingSubmenu({ title, popupId, ...props }) {
  const classes = useCascadingMenuStyles()
  const { parentPopupState } = React.useContext(CascadingContext)
  return (
    <PopupState
      popupId={popupId}
      variant="popover"
      parentPopupState={parentPopupState}
      disableAutoFocus
    >
      {(popupState) => (
        <React.Fragment>
          <MenuItem {...bindHover(popupState)}>
            <span className={classes.title}>{title}</span>
            <ChevronRight className={classes.moreArrow} />
          </MenuItem>
          <CascadingMenu
            {...props}
            classes={{ ...props.classes, paper: classes.submenu }}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            popupState={popupState}
          />
        </React.Fragment>
      )}
    </PopupState>
  )
}

function CascadingMenu({ popupState, ...props }) {
  const { rootPopupState } = React.useContext(CascadingContext)
  const context = React.useMemo(
    () => ({
      rootPopupState: rootPopupState || popupState,
      parentPopupState: popupState,
    }),
    [rootPopupState, popupState]
  )

  return (
    <CascadingContext.Provider value={context}>
      <HoverMenu {...props} {...bindMenu(popupState)} />
    </CascadingContext.Provider>
  )
}

const CascadingHoverMenus = () => (
  <PopupState variant="popover" popupId="demoMenu" disableAutoFocus>
    {(popupState) => (
      <div style={{ height: 600 }}>
        <Button variant="contained" {...bindHover(popupState)}>
          Hover to open Menu
        </Button>
        <CascadingMenu
          popupState={popupState}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        >
          <CascadingMenuItem>Tea</CascadingMenuItem>
          <CascadingMenuItem>Cake</CascadingMenuItem>
          <CascadingMenuItem>Death</CascadingMenuItem>
          <CascadingSubmenu
            popupId="moreChoicesCascadingMenu"
            title="More Choices"
          >
            <CascadingMenuItem>Cheesecake</CascadingMenuItem>
            <CascadingMenuItem>Cheesedeath</CascadingMenuItem>
            <CascadingSubmenu
              popupId="evenMoreChoicesCascadingMenu"
              title="Even More Choices"
            >
              <CascadingMenuItem>Cake (the band)</CascadingMenuItem>
              <CascadingMenuItem>Death Metal</CascadingMenuItem>
            </CascadingSubmenu>
            <CascadingSubmenu
              popupId="moreBenignChoices"
              title="More Benign Choices"
            >
              <CascadingMenuItem>Salad</CascadingMenuItem>
              <CascadingMenuItem>Lobotomy</CascadingMenuItem>
            </CascadingSubmenu>
          </CascadingSubmenu>
        </CascadingMenu>
      </div>
    )}
  </PopupState>
)

export default CascadingHoverMenus
