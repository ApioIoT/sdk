import { AxiosInstance } from 'axios'
import { BaseResponse } from '../types'

export type ResourceConfig = Record<string, any>

/**
 * Platform resource.
 *
 * @param client Axios Instance
 *
 * @template T Request type (es. NewDevice)
 * @template K Response type contains uuid property (es. Device)
 */
abstract class Resource<T, K extends BaseResponse> {
  constructor (protected client: AxiosInstance) {}

  abstract findAll(config?: ResourceConfig): Promise<K[] | never>
  abstract findById(uuid: string, config?: ResourceConfig): Promise<K | never>
  abstract create(data: T, config?: ResourceConfig): Promise<string | never>
  abstract updateById(uuid: string, data: T, config?: ResourceConfig): Promise<undefined | never>
  abstract deleteById(uuid: string, config?: ResourceConfig): Promise<undefined | never>
}

export default Resource
