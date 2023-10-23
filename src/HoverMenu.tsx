import * as React from 'react'
import { Menu as _Menu, type MenuProps } from '@mui/material'
import { interopRequireDefault } from './util/interopRequireDefault'
// work around https://github.com/vercel/next.js/issues/57285
const Menu = interopRequireDefault(_Menu)

const HoverMenu: React.ComponentType<MenuProps> = React.forwardRef(
  function HoverMenu(props: MenuProps, ref): any {
    return (
      <Menu
        {...props}
        ref={ref}
        style={{ pointerEvents: 'none', ...props.style }}
        PaperProps={{
          ...props.PaperProps,
          style: { pointerEvents: 'auto', ...props.PaperProps?.style },
        }}
      />
    )
  }
)

export default HoverMenu
