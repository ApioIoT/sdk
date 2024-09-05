import { AxiosError } from 'axios'
import { AuthenticationError, ConfigurationError, NotFoundError, SystemError } from './types/types'

export function handleException (e: Error): never {
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
    }
  }

  if (e.name === 'TypeError') {
    throw new ConfigurationError(e.message)
  }
  
  throw e
}