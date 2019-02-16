// @flow

import * as React from 'react'
import PropTypes from 'prop-types'

import {
  initCoreState,
  createPopupState,
  bindTrigger,
  bindToggle,
  bindHover,
  bindMenu,
  bindPopover,
  bindPopper,
  type Variant,
  type CoreState,
  type PopupState as InjectedProps,
} from './core'

export { bindTrigger, bindToggle, bindHover, bindMenu, bindPopover, bindPopper }
export type { Variant, InjectedProps }

export type Props = {
  popupId?: string,
  children: (props: InjectedProps) => ?React.Node,
  variant: Variant,
}

export default class PopupState extends React.Component<Props, CoreState> {
  state: CoreState = initCoreState

  static propTypes = {
    /**
     * The render function.
     *
     * @param {object} props the properties injected by `PopupState`:
     * <ul>
     *   <li>`open(eventOrAnchorEl)`: opens the popup</li>
     *   <li>`close()`: closes the popup</li>
     *   <li>`toggle(eventOrAnchorEl)`: opens the popup if it is closed, or
     *     closes the popup if it is open.
     *   </li>
     *   <li>`setOpen(open, [eventOrAnchorEl])`: sets whether the popup is open.
     *     `eventOrAnchorEl` is required if `open` is truthy.
     *   </li>
     *   <li>`isOpen`: `true`/`false` if the popup is open/closed</li>
     *   <li>`anchorEl`: the current anchor element (`null` the popup is closed)</li>
     *   <li>`popupId`: the `popupId` prop you passed</li>
     * </ul>
     *
     * @returns {React.Node} the content to display
     */
    children: PropTypes.func.isRequired,
    /**
     * The `id` property to use for the popup.  Will be passed to the render
     * function as `bindPopup.id`, and also used for the `aria-owns` property
     * passed to the trigger component via `bindTrigger`.
     */
    popupId: PropTypes.string,
    /**
     * Which type of popup you are controlling.  Use `'popover'` for `Popover`
     * and `Menu`; use `'popper'` for `Popper`s.  Right now this only affects
     * whether `aria-owns` or `aria-describedby` is used on the trigger
     * component.
     */
    variant: PropTypes.oneOf(['popover', 'popper']).isRequired,
  }

  render(): React.Node | null {
    const { children, popupId, variant } = this.props

    const popupState = createPopupState({
      state: this.state,
      setState: state => this.setState(state),
      popupId,
      variant,
    })

    const result = children(popupState)
    if (result == null) return null
    return result
  }
}
