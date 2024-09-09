import Resource from '../resource'
import { NodeType } from '../types/generated'
import { ApioResponse } from '../types/types'
import { handleException } from '../utils'

class NodeTypesResources extends Resource<NodeType> {
  async findAll (): Promise<Array<NodeType> | never> {
    try {
      const { data } = await this.client.get<ApioResponse<Array<NodeType>>>('nodetypes')
      return data.data!
    } catch (e) {
      handleException(e)
    }
  }

  async findById (uuid: string): Promise<NodeType | never> {
    try {
      const { data } = await this.client.get<ApioResponse<NodeType>>(`nodetypes/${uuid}`)
      return data.data!
    } catch (e) {
      handleException(e)
    }
  }

  async create (data: NodeType): Promise<string | never> {
    throw new Error('Unimplemented method')
  }

  async updateById (uuid: string, data: NodeType): Promise<boolean | never> {
    throw new Error('Unimplemented method')
  }

  async deleteById (uuid: string): Promise<boolean | never> {
    throw new Error('Unimplemented method')
  }
}

export default NodeTypesResources
