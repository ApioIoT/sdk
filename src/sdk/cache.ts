import Sdk, { Configuration } from './sdk'

import { AxiosInstance } from 'axios'
import { LRUCache } from 'lru-cache'

import { getNodes, getNode } from '../resources/node'
import { getDevice, getDevices } from '../resources/device'
import { getDeviceType, getDeviceTypes } from '../resources/deviceType'
import { getAsset, getAssets } from '../resources/assset'
import { getPlant, getPlants } from '../resources/plant'
import { getAssetType, getAssetTypes } from '../resources/assetType'
import { getNodeType, getNodeTypes } from '../resources/nodeType'

import { Asset, AssetType, Device, DeviceType, Node, NodeType, Plant } from '../types/types'

type UnionType = Asset | AssetType | Device | DeviceType | Node | NodeType | Plant
type FnType = ((client: AxiosInstance) => Promise<UnionType | Array<UnionType> | never>)
  | ((client: AxiosInstance, uuid: string) => Promise<UnionType | Array<UnionType> | never>)
type WrapReturnType = Promise<UnionType | Array<UnionType> | never>

class CacheSdk extends Sdk {
  private cache: LRUCache<string, UnionType | Array<UnionType>>

  constructor(config: Configuration) {
    super(config)

    const options = {
      max: 1000,
      ttl: 1000 * 60 * 5
    }

    if (typeof config.cache === 'object') {
      if (config.cache.max) {
        options.max = config.cache.max
      }
      if (config.cache.ttl) {
        options.ttl = config.cache.ttl
      }
    }

    this.cache = new LRUCache(options)
  }

  private buildKey(prefix: string, uuid?: string): string {
    return !uuid ? prefix : [prefix, uuid].join(':')
  }

  private async wrap(key: string, fn: FnType, client: AxiosInstance, uuid?: string): WrapReturnType {
    const _key = this.buildKey(key, uuid)

    if (this.cache.has(_key)) {
      return this.cache.get(_key)!
    }

    const res = await fn(client, uuid!)
    this.cache.set(_key, res)

    if (Array.isArray(res)) {
      for (const el of res) {
        this.cache.set(this.buildKey(key, el.uuid), el)
      }
    }

    return res
  }

  getAssets(): Promise<Array<Asset> | never> {
    return this.wrap('assets', getAssets, this.client) as Promise<Array<Asset> | never>
  }

  getAsset(uuid: string): Promise<Asset | never> {
    return this.wrap('assets', getAsset, this.client, uuid) as Promise<Asset | never>
  }

  getPlants(): Promise<Array<Plant> | never> {
    return this.wrap('plants', getPlants, this.client) as Promise<Array<Plant> | never>
  }

  getPlant(uuid: string): Promise<Plant | never> {
    return this.wrap('plants', getPlant, this.client, uuid) as Promise<Plant | never>
  }

  getAssetTypes(): Promise<Array<AssetType> | never> {
    return this.wrap('assetTypes', getAssetTypes, this.client) as Promise<Array<AssetType> | never>
  }

  getAssetType(uuid: string): Promise<AssetType | never> {
    return this.wrap('assetTypes', getAssetType, this.client, uuid) as Promise<AssetType | never>
  }

  getNodeTypes(): Promise<Array<NodeType> | never> {
    return this.wrap('nodeTypes', getNodeTypes, this.client) as Promise<Array<NodeType> | never>
  }

  getNodeType(uuid: string): Promise<NodeType | never> {
    return this.wrap('nodeTypes', getNodeType, this.client, uuid) as Promise<NodeType | never>
  }

  getDevices(): Promise<Array<Device> | never> {
    return this.wrap('devices', getDevices, this.client) as Promise<Array<Device> | never>
  }

  getDevice(uuid: string): Promise<Device | never> {
    return this.wrap('devices', getDevice, this.client, uuid) as Promise<Device | never>
  }

  getNodes(): Promise<Array<Node> | never> {
    return this.wrap('nodes', getNodes, this.client) as Promise<Array<Node> | never>
  }

  getNode(uuid: string): Promise<Node | never> {
    return this.wrap('nodes', getNode, this.client, uuid) as Promise<Node | never>
  }

  getDeviceTypes(): Promise<Array<DeviceType> | never> {
    return this.wrap('deviceTypes', getDeviceTypes, this.client) as Promise<Array<DeviceType> | never>
  }

  getDeviceType(uuid: string): Promise<DeviceType | never> {
    return this.wrap('deviceTypes', getDeviceType, this.client, uuid) as Promise<DeviceType | never>
  }
}

export default CacheSdk
