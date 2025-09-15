export class SystemError extends Error {}
export class ConfigurationError extends Error {}
export class AuthenticationError extends Error {}
export class NotFoundError extends Error {}
export class AbortError extends Error {}

export type ApioResponse<T> = {
  status: boolean,
  data?: T
  error?: {
    name: string
    message?: string
  }
}

export type BaseResponse = {
  uuid: string
}
