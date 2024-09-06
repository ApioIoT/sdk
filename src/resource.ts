import { AxiosInstance } from 'axios'

export abstract class Resource<T> {
  constructor (protected client: AxiosInstance) {}

  abstract findAll(): Promise<Array<T> | never>
  abstract findById(uuid: string): Promise<T | never>
  abstract create(data: T): Promise<string | never>
  abstract updateById(uuid: string, data: T): Promise<boolean | never>
  abstract deleteById(uuid: string): Promise<boolean | never>
}

export default Resource
