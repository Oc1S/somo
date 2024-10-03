import { isDev } from './env'

export const devLog = (...args: any[]) => {
  if (isDev) {
    console.error(...args)
  }
}
