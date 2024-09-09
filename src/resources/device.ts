import Resource from '../resource'
import { Device } from '../types/generated'
import { ApioResponse } from '../types/types'
import { handleException } from '../utils'

class DeviceResources extends Resource<Device> {
  async findAll (): Promise<Array<Device> | never> {
    try {
      const { data } = await this.client.get<ApioResponse<Array<Device>>>('devices')
      return data.data!
    } catch (e) {
      handleException(e)
    }
  }

  async findById (uuid: string): Promise<Device | never> {
    try {
      const { data } = await this.client.get<ApioResponse<Device>>(`devices/${uuid}`)
      return data.data!
    } catch (e) {
      handleException(e)
    }
  }

  async create (data: Device): Promise<string | never> {
    throw new Error('Unimplemented method')
  }

  async updateById (uuid: string, data: Device): Promise<boolean | never> {
    throw new Error('Unimplemented method')
  }

  async deleteById (uuid: string): Promise<boolean | never> {
    throw new Error('Unimplemented method')
  }
}

export default DeviceResources
