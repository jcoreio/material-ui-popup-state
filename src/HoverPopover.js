/**
 * @flow
 * @prettier
 */

import * as React from 'react'
import hoverWorkaround from './hoverWorkaround'
import Popover from '@material-ui/core/Popover'

export default (hoverWorkaround(Popover): React.ComponentType<
  React.ElementConfig<typeof Popover>
>)
