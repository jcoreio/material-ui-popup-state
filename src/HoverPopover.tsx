import * as React from 'react'
import Popover, { PopoverProps } from '@mui/material/Popover'

const HoverPopover: React.ComponentType<PopoverProps> = React.forwardRef(
  function HoverPopover(props: PopoverProps, ref): any {
    return (
      <Popover
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

export default HoverPopover
