import Resource from '../resource'
import { Asset } from '../types/generated'
import { ApioResponse } from '../types/types'
import { handleException } from '../utils'

class AssetResources extends Resource<Asset> {
  async findAll (): Promise<Array<Asset> | never> {
    try {
      const { data } = await this.client.get<ApioResponse<Array<Asset>>>('assets')
      return data.data!
    } catch (e) {
      handleException(e)
    }
  }

  async findById (uuid: string): Promise<Asset | never> {
    try {
      const { data } = await this.client.get<ApioResponse<Asset>>(`assets/${uuid}`)
      return data.data!
    } catch (e) {
      handleException(e)
    }
  }

  async create (data: Asset): Promise<string | never> {
    throw new Error('Unimplemented method')
  }

  async updateById (uuid: string, data: Asset): Promise<boolean | never> {
    throw new Error('Unimplemented method')
  }

  async deleteById (uuid: string): Promise<boolean | never> {
    throw new Error('Unimplemented method')
  }
}

export default AssetResources
