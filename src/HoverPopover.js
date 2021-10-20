/**
 * @flow
 * @prettier
 */

import * as React from 'react'
import hoverWorkaround from './hoverWorkaround'
import Popover from '@mui/material/Popover'

export default (hoverWorkaround(Popover): React.ComponentType<
  React.ElementConfig<typeof Popover>
>)
