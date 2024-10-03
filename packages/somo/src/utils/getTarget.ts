import { isFunction } from './helper'

export const getTarget = <T>(target: T | (() => T)): T | null => {
  if (!target) {
    return null
  }
  return isFunction(target) ? target() : target
}
