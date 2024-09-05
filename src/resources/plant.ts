import { AxiosInstance } from 'axios'
import { ApioResponse, Plant } from '../../index'
import { handleException } from '../utils'

export async function getPlants(client: AxiosInstance): Promise<Array<Plant> | never> {
  try {
    const { data } = await client.get<ApioResponse<Array<Plant>>>('plants')
    return data.data!
  } catch (e) {
    handleException(e as Error)
  }
}

export async function getPlant(client: AxiosInstance, uuid: string): Promise<Plant | never> {
  try {
    const { data } = await client.get<ApioResponse<Plant>>(`plants/${uuid}`)
    return data.data!
  } catch (e) {
    handleException(e as Error)
  }
}