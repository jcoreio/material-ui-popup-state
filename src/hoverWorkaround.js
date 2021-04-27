import * as React from 'react'

export default function hoverWorkaround(Comp) {
  /* eslint-disable react/display-name */
  return React.forwardRef(({ PaperProps, style, ...props }, ref) => (
    <Comp
      {...props}
      ref={ref}
      style={{ pointerEvents: 'none', ...style }}
      PaperProps={{
        ...PaperProps,
        style: { pointerEvents: 'auto', ...PaperProps?.style },
      }}
    />
  ))
}
