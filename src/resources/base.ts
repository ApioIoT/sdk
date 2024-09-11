import { AxiosInstance, AxiosResponse } from 'axios'
import Resource from './resource'
import { ApioResponse, BaseResponse } from '../types'
import { handleException } from '../utils'

class BaseResource<T, K extends BaseResponse> extends Resource<T, K> {
  private path: string

  constructor(client: AxiosInstance, path: string){
    super(client)
    this.path = path
  }

  async findAll(): Promise<Array<K> | never> {
    try {
      const { data } = await this.client.get<ApioResponse<Array<K>>>(this.path)
      return data.data!
    } catch (e) {
      handleException(e)
    }
  }

  async findById(uuid: string): Promise<K | never> {
    try {
      const { data } = await this.client.get<ApioResponse<K>>(`${this.path}/${uuid}`)
      return data.data!
    } catch (e) {
      handleException(e)
    }
  }

  async create(data: T): Promise<string | never> {
    try {
      const { data: dataRes } = await this.client.post<object, AxiosResponse<ApioResponse<K>>, T>(this.path, data)
      return dataRes.data!.uuid
    } catch (e) {
      handleException(e)
    }
  }

  async updateById(uuid: string, data: T): Promise<undefined | never> {
    try {
      await this.client.put(`${this.path}/${uuid}`, data)
    } catch (e) {
      handleException(e)
    }
  }

  async deleteById(uuid: string): Promise<undefined | never> {
    try {
      await this.client.delete(`${this.path}/${uuid}`)
    } catch (e) {
      handleException(e)
    }
  }
}

export default BaseResource
