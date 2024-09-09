import axios from 'axios'
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
  Plant 
} from '../types'

export type Configuration = {
  uri: string,
  apiKey?: string,
  projectId: string,
  timeout?: number,
  cache?: boolean
}

class Sdk {
  public readonly assetType: Resource<NewAssetType, AssetType>
  public readonly asset: Resource<NewAsset, Asset>
  public readonly device: Resource<NewDevice, Device>
  public readonly deviceType: Resource<NewDeviceType, DeviceType>
  public readonly node: Resource<NewNode, Node>
  public readonly nodeType: Resource<NewNodeType, NodeType>
  public readonly plant: Resource<NewPlant, Plant>

  private constructor(config: Configuration) {
    let client = axios.create({
      baseURL: [config.uri, '/projects/', config.projectId].join('') ,
      headers: {
        Authorization: config.apiKey ? `apiKey ${config.apiKey}` : undefined
      },
      timeout: config.timeout
    })

    if (config.cache) {
      client = setupCache(client)
    }

    this.assetType = new BaseResource(client, 'assetTypes')
    this.asset = new BaseResource(client, 'assets')
    this.device = new BaseResource(client, 'devices')
    this.deviceType = new BaseResource(client, 'deviceTypes')
    this.node = new BaseResource(client, 'nodes')
    this.nodeType = new BaseResource(client, 'nodetypes')
    this.plant = new BaseResource(client, 'plants')
  }

  static create(config: Configuration): Sdk {
    return Object.freeze(new Sdk(config))
  }
}

export default Sdk
