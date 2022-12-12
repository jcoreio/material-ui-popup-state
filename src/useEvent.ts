import * as React from 'react'

export function useEvent<Fn extends (...args: any[]) => any>(handler: Fn): Fn {
  const handlerRef = React.useRef<Fn | null>(null)

  React.useLayoutEffect(() => {
    handlerRef.current = handler
  })

  return React.useCallback((...args: any[]): any => {
    handlerRef.current?.(...args)
  }, []) as Fn
}
