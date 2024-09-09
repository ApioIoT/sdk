import { AxiosInstance } from 'axios'
import { handleException } from '../utils'
import { ApioResponse } from '../types'

export class Resource<T, K extends T> {
  private client: AxiosInstance
  private path: string

  constructor (client: AxiosInstance, path: string) {
    this.client = client
    this.path = path
  }

  async findAll (): Promise<Array<K> | never> {
    try {
      const { data } = await this.client.get<ApioResponse<Array<K>>>(this.path)
      return data.data!
    } catch (e) {
      handleException(e)
    }
  }

  async findById (uuid: string): Promise<K | never> {
    try {
      const { data } = await this.client.get<ApioResponse<K>>(`${this.path}/${uuid}`)
      return data.data!
    } catch (e) {
      handleException(e)
    }
  }

  async create (data: T): Promise<string | never> {
    throw new Error('Unimplemented method')
  }

  async updateById (uuid: string, data: T): Promise<boolean | never> {
    throw new Error('Unimplemented method')
  }

  async deleteById (uuid: string): Promise<boolean | never> {
    throw new Error('Unimplemented method')
  }
}

export default Resource
