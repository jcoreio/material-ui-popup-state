/* eslint-disable @typescript-eslint/ban-types */
export function chainEventHandlers<T1 extends {}, T2 extends {}>(
  t1: T1,
  t2: T2
): T1 & T2
export function chainEventHandlers<T1 extends {}, T2 extends {}, T3 extends {}>(
  t1: T1,
  t2: T2,
  t3: T3
): T1 & T2 & T3
export function chainEventHandlers<
  T1 extends {},
  T2 extends {},
  T3 extends {},
  T4 extends {}
>(t1: T1, t2: T2, t3: T3, t4: T4): T1 & T2 & T3 & T4
export function chainEventHandlers<
  T1 extends {},
  T2 extends {},
  T3 extends {},
  T4 extends {},
  T5 extends {}
>(t1: T1, t2: T2, t3: T3, t4: T4, t5: T5): T1 & T2 & T3 & T4 & T5
export function chainEventHandlers<
  T1 extends {},
  T2 extends {},
  T3 extends {},
  T4 extends {},
  T5 extends {},
  T6 extends {}
>(t1: T1, t2: T2, t3: T3, t4: T4, t5: T5, t6: T6): T1 & T2 & T3 & T4 & T5 & T6
export function chainEventHandlers<
  T1 extends {},
  T2 extends {},
  T3 extends {},
  T4 extends {},
  T5 extends {},
  T6 extends {},
  T7 extends {}
>(
  t1: T1,
  t2: T2,
  t3: T3,
  t4: T4,
  t5: T5,
  t6: T6,
  t7: T7
): T1 & T2 & T3 & T4 & T5 & T6 & T7
export function chainEventHandlers<
  T1 extends {},
  T2 extends {},
  T3 extends {},
  T4 extends {},
  T5 extends {},
  T6 extends {},
  T7 extends {},
  T8 extends {}
>(
  t1: T1,
  t2: T2,
  t3: T3,
  t4: T4,
  t5: T5,
  t6: T6,
  t7: T7,
  t8: T8
): T1 & T2 & T3 & T4 & T5 & T6 & T7 & T8
export function chainEventHandlers(
  first: Record<string, any>,
  ...rest: Record<string, any>[]
): Record<string, any> {
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
  return result
}
