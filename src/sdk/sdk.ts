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
  apiKey?: string,
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

  private client: AxiosInstance

  private constructor(config: Configuration) {
    this.client = axios.create({
      baseURL: [config.uri, '/projects/', config.projectId].join('') ,
      headers: config.apiKey 
        ? { Authorization: `apiKey ${config.apiKey}` } 
        : {},
      timeout: config.timeout,
      signal: config.signal
    })

    if (config.cache) {
      this.client = setupCache(this.client, typeof config.cache === 'object' ? config.cache : undefined)
    }

    this.assetType = new BaseResource(this.client, 'assetTypes')
    this.asset = new BaseResource(this.client, 'assets')
    this.device = new BaseResource(this.client, 'devices')
    this.deviceType = new BaseResource(this.client, 'deviceTypes')
    this.node = new BaseResource(this.client, 'nodes')
    this.nodeType = new BaseResource(this.client, 'nodetypes')
    this.plant = new BaseResource(this.client, 'plants')
    this.rule = new BaseResource(this.client, 'rules')
  }

  static create(config: Configuration): Readonly<Sdk> {
    return Object.freeze(new Sdk(config))
  }

  public async project(): Promise<Project> {
    try {
      const { data } = await this.client.get<ApioResponse<Project>>('/')
      return data.data!
    } catch (e) {
      handleException(e)
    }
  }
}

export default Sdk
