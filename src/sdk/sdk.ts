import axios, { AxiosInstance } from 'axios'

import { Asset, AssetType, Device, DeviceType, Node, NodeType, Plant } from '../types/types'

export type Configuration = {
  baseUri: string,
  apiKey?: string,
  projectId: string,
  timeout?: number,
  cache?: {
    max?: number
    ttl?: number
  } | boolean
}

abstract class Sdk {
  protected client: AxiosInstance

  constructor(config: Configuration) {
    this.client = axios.create({
      baseURL: [config.baseUri, '/projects/', config.projectId].join('') ,
      headers: {
        Authorization: config.apiKey ? `apiKey ${config.apiKey}` : undefined
      },
      timeout: config.timeout
    })
  }

  static create(config: Configuration): Sdk {
    if (config.cache) {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const cache = require('./cache').default
      return new cache(config)
    }

    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const simple = require('./simple').default
    return new simple(config)
  }

  abstract getAssets(): Promise<Array<Asset> | never>
  abstract getAsset(uuid: string): Promise<Asset | never>

  abstract getDevices(): Promise<Array<Device> | never>
  abstract getDevice(uuid: string): Promise<Device | never>

  abstract getNodes(): Promise<Array<Node> | never>
  abstract getNode(uuid: string): Promise<Node | never>

  abstract getPlants(): Promise<Array<Plant> | never>
  abstract getPlant(uuid: string): Promise<Plant | never>

  // abstract getFirmwares(): Promise<Array<Firmware> | never>
  // abstract getFirmware(uuid: string): Promise<Firmware | never>

  abstract getAssetTypes(): Promise<Array<AssetType> | never>
  abstract getAssetType(uuid: string): Promise<AssetType | never>

  abstract getDeviceTypes(): Promise<Array<DeviceType> | never>
  abstract getDeviceType(uuid: string): Promise<DeviceType | never>

  abstract getNodeTypes(): Promise<Array<NodeType> | never>
  abstract getNodeType(uuid: string): Promise<NodeType | never>
}

export default Sdk
