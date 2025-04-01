import * as React from 'react'
import Code from '@mui/icons-material/Code'
import Collapse from '@mui/material/Collapse'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import Box from '@mui/material/Box'

const { useState, useCallback } = React

const Demo = ({ headerId, title, code, example, hooksCode, hooksExample }) => {
  const [showSource, setShowSource] = useState(false)
  const [api, setApi] = useState('hooks')
  const setRenderProps = useCallback(() => setApi('render-props'), [])
  const setHooks = useCallback(() => setApi('hooks'), [])
  return (
    <Box sx={{ margin: '20px auto' }}>
      <Typography
        variant="h4"
        sx={{
          marginTop: '40px',
          marginBottom: 0,
          '&:hover > a': {
            visibility: 'visible',
          },
        }}
        id={headerId}
      >
        {title}
        {headerId && (
          <Box
            component="a"
            href={`#${headerId}`}
            sx={{
              color: '#aaa',
              marginLeft: '10px',
              textDecoration: 'none',
              visibility: 'hidden',
            }}
          >
            #
          </Box>
        )}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {code != null && hooksCode != null && (
          <React.Fragment>
            <Button
              variant={api === 'render-props' ? 'outlined' : 'text'}
              onClick={setRenderProps}
            >
              Render Props
            </Button>
            <Button
              variant={api === 'hooks' ? 'outlined' : 'text'}
              onClick={setHooks}
            >
              Hooks
            </Button>
          </React.Fragment>
        )}
        <Box sx={{ flex: '1 1 auto' }} />
        <Tooltip title="Show Source" placement="top">
          <IconButton onClick={() => setShowSource(!showSource)} size="large">
            <Code />
          </IconButton>
        </Tooltip>
      </Box>
      <Collapse in={showSource}>
        <Box
          component="pre"
          sx={{
            margin: 0,
            padding: '20px',
            backgroundColor: 'white',
            borderRadius: '4px',
          }}
        >
          {api === 'hooks' ? hooksCode || code : code || hooksCode}
        </Box>
      </Collapse>
      <Box
        sx={{
          backgroundColor: '#eee',
          borderRadius: '4px',
          display: 'flex',
          alignContent: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px',
        }}
      >
        {api === 'hooks' ? hooksExample || example : example || hooksExample}
      </Box>
    </Box>
  )
}

export default Demo
