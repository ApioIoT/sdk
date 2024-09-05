import { AxiosInstance } from 'axios'
import { ApioResponse, Node } from '../../index'
import { handleException } from '../utils'

export async function getNodes(client: AxiosInstance): Promise<Array<Node> | never> {
  try {
    const { data } = await client.get<ApioResponse<Array<Node>>>('nodes')
    return data.data!
  } catch (e) {
    handleException(e as Error)
  }
}

export async function getNode(client: AxiosInstance, uuid: string): Promise<Node | never> {
  try {
    const { data } = await client.get<ApioResponse<Node>>(`nodes/${uuid}`)
    return data.data!
  } catch (e) {
    handleException(e as Error)
  }
}
