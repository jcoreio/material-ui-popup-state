/**
 * @flow
 * @prettier
 */

import * as React from 'react'
import hoverWorkaround from './hoverWorkaround'
import Menu from '@material-ui/core/Menu'

export default (hoverWorkaround(Menu): React.ComponentType<
  React.ElementConfig<typeof Menu>
>)
