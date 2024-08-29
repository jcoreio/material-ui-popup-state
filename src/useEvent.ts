import * as React from 'react'

export function useEvent<Fn extends (...args: any[]) => any>(handler: Fn): Fn {
  // istanbul ignore next
  if (typeof window === 'undefined') {
    // useLayoutEffect doesn't work on the server side, don't bother
    // trying to make callback functions stable
    return handler
  }

  const handlerRef = React.useRef<Fn | null>(null)

  React.useLayoutEffect(() => {
    handlerRef.current = handler
  })

  return React.useCallback((...args: any[]): any => {
    handlerRef.current?.(...args)
  }, []) as Fn
}
