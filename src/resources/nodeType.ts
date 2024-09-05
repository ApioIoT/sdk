import { AxiosInstance } from 'axios'
import { ApioResponse, NodeType } from '../../index'
import { handleException } from '../utils'

export async function getNodeTypes(client: AxiosInstance): Promise<Array<NodeType> | never> {
  try {
    const { data } = await client.get<ApioResponse<Array<NodeType>>>('nodetypes')
    return data.data!
  } catch (e) {
    handleException(e as Error)
  }
}

export async function getNodeType(client: AxiosInstance, uuid: string): Promise<NodeType | never> {
  try {
    const { data } = await client.get<ApioResponse<NodeType>>(`nodetypes/${uuid}`)
    return data.data!
  } catch (e) {
    handleException(e as Error)
  }
}