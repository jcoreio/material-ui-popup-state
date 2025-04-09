type Assign<A, B> = {
  [K in keyof A | keyof B]: K extends keyof A ?
    K extends keyof B ?
      NonNullable<A[K]> extends (...args: any[]) => any ?
        NonNullable<B[K]> extends (...args: any[]) => any ?
          A[K] | B[K]
        : B[K]
      : B[K]
    : A[K]
  : K extends keyof B ? B[K]
  : never
}

type MergeObjectsArray<T extends object[]> =
  T extends [infer F, ...infer R] ?
    Assign<F, R extends object[] ? MergeObjectsArray<R> : NonNullable<unknown>>
  : NonNullable<unknown>

type PrettyObject<T> = { [K in keyof T]: T[K] } & NonNullable<unknown>

export function chainEventHandlers<
  First extends Record<string, any>,
  Rest extends Record<string, any>[],
>(
  first: First,
  ...rest: Rest
): PrettyObject<MergeObjectsArray<[First, ...Rest]>> {
  const result: Record<string, any> = { ...first }
  for (const obj of rest) {
    for (const key in obj) {
      const value = obj[key]
      const prev = result[key]
      if (typeof prev === 'function' && typeof value === 'function') {
        result[key] = (...args: any[]) => {
          prev(...args)
          return value(...args)
        }
      } else {
        result[key] = value
      }
    }
  }
  return result as MergeObjectsArray<[First, ...Rest]>
}
