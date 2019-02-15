/**
 * @flow
 * @prettier
 */

import hoverWorkaround from './hoverWorkaround'
import Menu from '@material-ui/core/Menu'

export default (hoverWorkaround(Menu): React.ComponentType<
  React.ElementConfig<Menu>
>)
