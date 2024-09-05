import Sdk from './src/sdk/sdk'

import { components } from './src/types/schema'

export class SystemError extends Error {}
export class ConfigurationError extends Error {}
export class AuthenticationError extends Error {}
export class NotFoundError extends Error {}

export type ApioResponse<T> = {
  status: boolean,
  data?: T
  error?: {
    name: string
    message?: string
  }
} 

export type Asset = components['schemas']['Asset']
export type Device = components['schemas']['Device']
export type Node = components['schemas']['Node']
export type Plant = components['schemas']['Plant']
// export type Firmware = components['schemas']['Firmware']
export type AssetType = components['schemas']['AssetType']
export type DeviceType = components['schemas']['DeviceType']
export type NodeType = components['schemas']['NodeType']

export type Configuration = {
  uri: string,
  apiKey?: string,
  projectId: string,
  timeout?: number,
  cache?: {
    max?: number
    ttl?: number
  } | boolean
}

export default Sdk