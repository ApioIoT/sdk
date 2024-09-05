import { AxiosInstance } from 'axios'
import { ApioResponse, Device } from '../../index'
import { handleException } from '../utils'

export async function getDevices(client: AxiosInstance): Promise<Array<Device> | never> {
  try {
    const { data } = await client.get<ApioResponse<Array<Device>>>('devices')
    return data.data!
  } catch (e) {
    handleException(e as Error)
  }
}

export async function getDevice(client: AxiosInstance, uuid: string): Promise<Device | never> {
  try {
    const { data } = await client.get<ApioResponse<Device>>(`devices/${uuid}`)
    return data.data!
  } catch (e) {
    handleException(e as Error)
  }
}