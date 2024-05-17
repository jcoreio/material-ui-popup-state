import * as React from 'react'
import { Popover as _Popover, type PopoverProps } from '@mui/material'
import { interopRequireDefault } from './util/interopRequireDefault'
// work around https://github.com/vercel/next.js/issues/57285
const Popover = interopRequireDefault(_Popover)

const HoverPopover: React.ComponentType<PopoverProps> = React.forwardRef(
  function HoverPopover(props: PopoverProps, ref): any {
    const paperSlotProps = React.useCallback(
      // eslint-disable-next-line @typescript-eslint/ban-types
      (ownerProps: {}) => {
        const base =
          props.slotProps?.paper instanceof Function
            ? props.slotProps?.paper(ownerProps)
            : props.slotProps?.paper
        return {
          ...base,
          style: {
            pointerEvents: 'auto',
            ...base?.style,
          },
        } as const
      },
      [props.slotProps?.paper]
    )

    return (
      <Popover
        {...props}
        ref={ref}
        style={{ pointerEvents: 'none', ...props.style }}
        PaperProps={{
          ...props.PaperProps,
          style: {
            pointerEvents: 'auto',
            ...props.PaperProps?.style,
          },
        }}
        slotProps={{
          ...props.slotProps,
          paper: paperSlotProps,
        }}
      />
    )
  }
)

export default HoverPopover
