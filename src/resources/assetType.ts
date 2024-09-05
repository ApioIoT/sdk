import { AxiosInstance } from 'axios'
import { ApioResponse, AssetType } from '../../index'
import { handleException } from '../utils'

export async function getAssetTypes(client: AxiosInstance): Promise<Array<AssetType> | never> {
  try {
    const { data } = await client.get<ApioResponse<Array<AssetType>>>('assetTypes')
    return data.data!
  } catch (e) {
    handleException(e as Error)
  }
}

export async function getAssetType(client: AxiosInstance, uuid: string): Promise<AssetType | never> {
  try {
    const { data } = await client.get<ApioResponse<AssetType>>(`assetTypes/${uuid}`)
    return data.data!
  } catch (e) {
    handleException(e as Error)
  }
}