import * as React from 'react'
import { Menu, MenuProps } from '@mui/material'

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
