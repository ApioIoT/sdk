import axios, { AxiosInstance, GenericAbortSignal } from 'axios'
import { setupCache } from 'axios-cache-interceptor'

import Resource from '../resources/resource'
import BaseResource from '../resources/base'

import { 
  Asset, 
  AssetType, 
  Device, 
  DeviceType, 
  NewAsset,
  NewAssetType, 
  NewDevice, 
  NewDeviceType, 
  NewNode, 
  NewNodeType, 
  NewPlant, 
  Node, 
  NodeType, 
  Plant, 
  Project,
  ApioResponse,
  NewRule,
  Rule
} from '../types'

import { handleException } from '../utils'

export type Configuration = {
  uri: string,
  authorization?: {
    type: 'apiKey' | 'Bearer',
    secret: string
  },
  projectId: string,
  cache?: boolean | { ttl: number },
  timeout?: number,
  signal?: GenericAbortSignal
}

class Sdk {
  public readonly assetType: Resource<NewAssetType, AssetType>
  public readonly asset: Resource<NewAsset, Asset>
  public readonly device: Resource<NewDevice, Device>
  public readonly deviceType: Resource<NewDeviceType, DeviceType>
  public readonly node: Resource<NewNode, Node>
  public readonly nodeType: Resource<NewNodeType, NodeType>
  public readonly plant: Resource<NewPlant, Plant>
  public readonly rule: Resource<NewRule, Rule>

  private readonly configuration: Omit<Configuration, 'projectId'>
  private client: AxiosInstance

  private constructor(config: Configuration) {
    this.configuration = config
    
    this.client = this.createAxiosClient(config.projectId)

    this.assetType = new BaseResource(this.client, 'assetTypes')
    this.asset = new BaseResource(this.client, 'assets')
    this.device = new BaseResource(this.client, 'devices')
    this.deviceType = new BaseResource(this.client, 'deviceTypes')
    this.node = new BaseResource(this.client, 'nodes')
    this.nodeType = new BaseResource(this.client, 'nodetypes')
    this.plant = new BaseResource(this.client, 'plants')
    this.rule = new BaseResource(this.client, 'rules')
  }

  private createAxiosClient(projectId: string): AxiosInstance {
    const headers: Record<string, string> = {}

    const { authorization } = this.configuration
    if (authorization?.type === 'apiKey') {
      headers.Authorization = `apiKey ${authorization.secret}`
    } else if (authorization?.type === 'Bearer') {
      headers.Authorization = `Bearer ${authorization.secret}`
    }

    const client = axios.create({
      baseURL: [this.configuration.uri, '/projects/', projectId].join(''),
      headers,
      timeout: this.configuration.timeout,
      signal: this.configuration.signal
    })

    if (this.configuration.cache) {
      return setupCache(client, typeof this.configuration.cache === 'object' ? this.configuration.cache : undefined)
    }

    return client
  }

  static create(config: Configuration): Sdk {
    return new Sdk(config)
  }

  async project(): Promise<Project> {
    try {
      const { data } = await this.client.get<ApioResponse<Project>>('/')
      return data.data!
    } catch (e) {
      handleException(e)
    }
  }

  switchProject(projectId: string) {
    this.client = this.createAxiosClient(projectId)
  }
}

export default Sdk
