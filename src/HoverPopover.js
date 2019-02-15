/**
 * @flow
 * @prettier
 */

import hoverWorkaround from './hoverWorkaround'
import Popover from '@material-ui/core/Popover'

export default (hoverWorkaround(Popover): React.ComponentType<
  React.ElementConfig<Popover>
>)
