import { AxiosInstance } from 'axios'
import { ApioResponse, DeviceType } from '../types/types'
import { handleException } from '../utils'

export async function getDeviceTypes(client: AxiosInstance): Promise<Array<DeviceType> | never> {
  try {
    const { data } = await client.get<ApioResponse<Array<DeviceType>>>('deviceTypes')
    return data.data!
  } catch (e) {
    handleException(e as Error)
  }
}

export async function getDeviceType(client: AxiosInstance, uuid: string): Promise<DeviceType | never> {
  try {
    const { data } = await client.get<ApioResponse<DeviceType>>(`deviceTypes/${uuid}`)
    return data.data!
  } catch (e) {
    handleException(e as Error)
  }
}
