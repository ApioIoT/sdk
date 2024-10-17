import { AxiosInstance, AxiosResponse } from 'axios'
import Resource, { ResourceConfig } from './resource'
import { ApioResponse, BaseResponse } from '../types'
import { handleException } from '../utils'

class BaseResource<T, K extends BaseResponse> extends Resource<T, K> {
  private path: string

  constructor(client: AxiosInstance, path: string){
    super(client)
    this.path = path
  }

  async findAll(config?: ResourceConfig): Promise<Array<K> | never> {
    try {
      const { data } = await this.client.get<ApioResponse<Array<K>>>(this.path, { 
        params: config
      })
      return data.data!
    } catch (e) {
      handleException(e)
    }
  }

  async findById(uuid: string, config?: ResourceConfig): Promise<K | never> {
    try {
      const { data } = await this.client.get<ApioResponse<K>>(`${this.path}/${uuid}`, { 
        params: config
      })
      return data.data!
    } catch (e) {
      handleException(e)
    }
  }

  async create(data: T, config?: ResourceConfig): Promise<string | never> {
    try {
      const { data: dataRes } = await this.client.post<object, AxiosResponse<ApioResponse<K>>, T>(this.path, data, { 
        params: config
      })
      return dataRes.data!.uuid
    } catch (e) {
      handleException(e)
    }
  }

  async updateById(uuid: string, data: T, config?: ResourceConfig): Promise<undefined | never> {
    try {
      await this.client.put(`${this.path}/${uuid}`, data, { 
        params: config
      })
    } catch (e) {
      handleException(e)
    }
  }

  async deleteById(uuid: string, config?: ResourceConfig): Promise<undefined | never> {
    try {
      await this.client.delete(`${this.path}/${uuid}`, { 
        params: config
      })
    } catch (e) {
      handleException(e)
    }
  }
}

export default BaseResource
