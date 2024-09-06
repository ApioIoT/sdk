import Resource from '../resource'
import { ApioResponse, Plant } from '../types/types'
import { handleException } from '../utils'

class PlantResources extends Resource<Plant> {
  async findAll (): Promise<Array<Plant> | never> {
    try {
      const { data } = await this.client.get<ApioResponse<Array<Plant>>>('plants')
      return data.data!
    } catch (e) {
      handleException(e)
    }
  }

  async findById (uuid: string): Promise<Plant | never> {
    try {
      const { data } = await this.client.get<ApioResponse<Plant>>(`plants/${uuid}`)
      return data.data!
    } catch (e) {
      handleException(e)
    }
  }

  async create (data: Plant): Promise<string | never> {
    throw new Error('Unimplemented method')
  }

  async updateById (uuid: string, data: Plant): Promise<boolean | never> {
    throw new Error('Unimplemented method')
  }

  async deleteById (uuid: string): Promise<boolean | never> {
    throw new Error('Unimplemented method')
  }
}

export default PlantResources
