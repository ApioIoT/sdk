import Sdk from './sdk'

import { getNodes, getNode } from '../resources/node'
import { getDevice, getDevices } from '../resources/device'
import { getDeviceType, getDeviceTypes } from '../resources/deviceType'
import { getAsset, getAssets } from '../resources/assset'
import { getPlant, getPlants } from '../resources/plant'
import { getAssetType, getAssetTypes } from '../resources/assetType'
import { getNodeType, getNodeTypes } from '../resources/nodeType'

import { Asset, AssetType, Device, DeviceType, Node, NodeType, Plant } from '../types/types'

class SimpleSdk extends Sdk {
  getAssets(): Promise<Array<Asset> | never> {
    return getAssets(this.client)
  }

  getAsset(uuid: string): Promise<Asset | never> {
    return getAsset(this.client, uuid)
  }

  getPlants(): Promise<Array<Plant> | never> {
    return getPlants(this.client)
  }

  getPlant(uuid: string): Promise<Plant | never> {
    return getPlant(this.client, uuid)
  }

  getAssetTypes(): Promise<Array<AssetType> | never> {
    return getAssetTypes(this.client)
  }

  getAssetType(uuid: string): Promise<AssetType | never> {
    return getAssetType(this.client, uuid)
  }

  getNodeTypes(): Promise<Array<NodeType> | never> {
    return getNodeTypes(this.client)
  }

  getNodeType(uuid: string): Promise<NodeType | never> {
    return getNodeType(this.client, uuid)
  }

  getDevices(): Promise<Array<Device> | never> {
    return getDevices(this.client)
  }

  getDevice(uuid: string): Promise<Device | never> {
    return getDevice(this.client, uuid)
  }

  getNodes(): Promise<Array<Node> | never> {
    return getNodes(this.client)
  }

  getNode(uuid: string): Promise<Node | never> {
    return getNode(this.client, uuid)
  }

  getDeviceTypes(): Promise<Array<DeviceType> | never> {
    return getDeviceTypes(this.client)
  }

  getDeviceType(uuid: string): Promise<DeviceType | never> {
    return getDeviceType(this.client, uuid)
  }
}

export default SimpleSdk
