import { AxiosInstance } from 'axios'
import { ApioResponse, Asset } from '../types/types'
import { handleException } from '../utils'

export async function getAssets(client: AxiosInstance): Promise<Array<Asset> | never> {
  try {
    const { data } = await client.get<ApioResponse<Array<Asset>>>('assets')
    return data.data!
  } catch (e) {
    handleException(e as Error)
  }
}

export async function getAsset(client: AxiosInstance, uuid: string): Promise<Asset | never> {
  try {
    const { data } = await client.get<ApioResponse<Asset>>(`assets/${uuid}`)
    return data.data!
  } catch (e) {
    handleException(e as Error)
  }
}