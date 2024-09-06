import Resource from '../resource'
import { ApioResponse, Node } from '../types/types'
import { handleException } from '../utils'

class NodeResources extends Resource<Node> {
  async findAll (): Promise<Array<Node> | never> {
    try {
      const { data } = await this.client.get<ApioResponse<Array<Node>>>('nodes')
      return data.data!
    } catch (e) {
      handleException(e)
    }
  }

  async findById (uuid: string): Promise<Node | never> {
    try {
      const { data } = await this.client.get<ApioResponse<Node>>(`nodes/${uuid}`)
      return data.data!
    } catch (e) {
      handleException(e)
    }
  }

  async create (data: Node): Promise<string | never> {
    throw new Error('Unimplemented method')
  }

  async updateById (uuid: string, data: Node): Promise<boolean | never> {
    throw new Error('Unimplemented method')
  }

  async deleteById (uuid: string): Promise<boolean | never> {
    throw new Error('Unimplemented method')
  }
}

export default NodeResources
