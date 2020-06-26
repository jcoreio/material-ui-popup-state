import * as React from 'react'

export default function hoverWorkaround(Comp) {
  /* eslint-disable react/display-name */
  return React.forwardRef(({ PaperProps, style, ...props }, ref) => (
    <Comp
      ref={ref}
      style={{ pointerEvents: 'none', ...style }}
      PaperProps={{
        style: { pointerEvents: 'auto', ...PaperProps?.style },
        ...PaperProps,
      }}
      {...props}
    />
  ))
}
