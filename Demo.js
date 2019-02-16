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
  titleAnchor: {
    color: '#aaa',
    marginLeft: 10,
    textDecoration: 'none',
    visibility: 'hidden',
    '$title:hover > &': {
      visibility: 'visible',
    },
  },
}

const Demo = ({ headerId, classes, title, code, example }) => {
  const [showSource, setShowSource] = useState(false)
  return (
    <div className={classes.root}>
      <Typography variant="h4" className={classes.title} id={headerId}>
        {title}
        {headerId && (
          <a href={`/#${headerId}`} className={classes.titleAnchor}>
            #
          </a>
        )}
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
