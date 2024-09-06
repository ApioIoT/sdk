import Resource from '../resource'
import { ApioResponse, AssetType } from '../types/types'
import { handleException } from '../utils'

class AssetTypeResources extends Resource<AssetType> {
  async findAll (): Promise<Array<AssetType> | never> {
    try {
      const { data } = await this.client.get<ApioResponse<Array<AssetType>>>('assetTypes')
      return data.data!
    } catch (e) {
      handleException(e)
    }
  }

  async findById (uuid: string): Promise<AssetType | never> {
    try {
      const { data } = await this.client.get<ApioResponse<AssetType>>(`assetTypes/${uuid}`)
      return data.data!
    } catch (e) {
      handleException(e)
    }
  }

  async create (data: AssetType): Promise<string | never> {
    throw new Error('Unimplemented method')
  }

  async updateById (uuid: string, data: AssetType): Promise<boolean | never> {
    throw new Error('Unimplemented method')
  }

  async deleteById (uuid: string): Promise<boolean | never> {
    throw new Error('Unimplemented method')
  }
}

export default AssetTypeResources
