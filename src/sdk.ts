import axios from 'axios'
import { setupCache } from 'axios-cache-interceptor'

import Resource from './resource'

import AssetTypeResources from './resources/assetType'
import AssetResources from './resources/assset'
import DeviceResources from './resources/device'
import DeviceTypeResources from './resources/deviceType'
import NodeResources from './resources/node'
import NodeTypesResources from './resources/nodeType'
import PlantResources from './resources/plant'

import { Asset, AssetType, Device, DeviceType, Node, NodeType, Plant } from './types/types'

export type Configuration = {
  uri: string,
  apiKey?: string,
  projectId: string,
  timeout?: number,
  cache?: boolean
}

class Sdk {
  public readonly assetType: Resource<AssetType>
  public readonly asset: Resource<Asset>
  public readonly device: Resource<Device>
  public readonly deviceType: Resource<DeviceType>
  public readonly node: Resource<Node>
  public readonly nodeType: Resource<NodeType>
  public readonly plant: Resource<Plant>

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

    this.assetType = new AssetTypeResources(client)
    this.asset = new AssetResources(client)
    this.device = new DeviceResources(client)
    this.deviceType = new DeviceTypeResources(client)
    this.node = new NodeResources(client)
    this.nodeType = new NodeTypesResources(client)
    this.plant = new PlantResources(client)
  }

  static create(config: Configuration): Sdk {
    return Object.freeze(new Sdk(config))
  }
}

export default Sdk
