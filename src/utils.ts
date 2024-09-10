import { AxiosError } from 'axios'
import { AuthenticationError, ConfigurationError, NotFoundError, SystemError, AbortError } from './types'

export function handleException (e: unknown): never {
  if (e instanceof AxiosError) {
    switch (e.status) {
      case 401:
        throw new AuthenticationError(e.message)
      case 404:
        throw new NotFoundError(e.message)
      case 500:
        throw new SystemError(e.message)
    }

    switch (e.code) {
      case 'ENOTFOUND':
        throw new ConfigurationError(e.message)
      case 'ERR_INVALID_URL':
        throw new ConfigurationError(e.message)
      case 'ECONNABORTED':
        throw new AbortError(e.message)
      case 'ERR_CANCELED':
        throw new AbortError(e.message)
    }

    throw new ConfigurationError(e.message)
  }

  const _e = e as Error
  if (_e.name === 'TypeError') {
    throw new ConfigurationError(_e.message)
  }

  throw e
}
