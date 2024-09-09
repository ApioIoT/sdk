import Resource from '../resource'
import { DeviceType } from '../types/generated'
import { ApioResponse } from '../types/types'
import { handleException } from '../utils'

class DeviceTypeResources extends Resource<DeviceType> {
  async findAll (): Promise<Array<DeviceType> | never> {
    try {
      const { data } = await this.client.get<ApioResponse<Array<DeviceType>>>('deviceTypes')
      return data.data!
    } catch (e) {
      handleException(e)
    }
  }

  async findById (uuid: string): Promise<DeviceType | never> {
    try {
      const { data } = await this.client.get<ApioResponse<DeviceType>>(`deviceTypes/${uuid}`)
      return data.data!
    } catch (e) {
      handleException(e)
    }
  }

  async create (data: DeviceType): Promise<string | never> {
    throw new Error('Unimplemented method')
  }

  async updateById (uuid: string, data: DeviceType): Promise<boolean | never> {
    throw new Error('Unimplemented method')
  }

  async deleteById (uuid: string): Promise<boolean | never> {
    throw new Error('Unimplemented method')
  }
}

export default DeviceTypeResources
