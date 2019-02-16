import * as React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Code from '@material-ui/icons/Code'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'

const { useState } = React

const styles = {
  title: {
    marginTop: 40,
    marginBottom: 0,
  },
  root: {
    margin: '20px auto',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  code: {
    margin: 0,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 4,
  },
  example: {
    backgroundColor: '#eee',
    borderRadius: 4,
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
}

const Demo = ({ classes, title, code, example }) => {
  const [showSource, setShowSource] = useState(false)
  return (
    <div className={classes.root}>
      <Typography variant="h4" className={classes.title}>
        {title}
      </Typography>
      <div className={classes.toolbar}>
        <Tooltip title="Show Source" placement="top">
          <IconButton onClick={() => setShowSource(!showSource)}>
            <Code />
          </IconButton>
        </Tooltip>
      </div>
      <Collapse in={showSource}>
        <pre className={classes.code}>{code}</pre>
      </Collapse>
      <div className={classes.example}>{example}</div>
    </div>
  )
}

export default withStyles(styles)(Demo)
