import { AxiosInstance } from 'axios'
import { BaseResponse } from '../types'

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

  abstract findAll(): Promise<Array<K> | never>
  abstract findById(uuid: string): Promise<K | never>
  abstract create(data: T): Promise<string | never>
  abstract updateById(uuid: string, data: T): Promise<undefined | never>
  abstract deleteById(uuid: string): Promise<undefined | never>
}

export default Resource
