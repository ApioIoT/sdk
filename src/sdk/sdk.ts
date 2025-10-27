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
  NewRule,
  Rule
} from '../types'

export type Configuration = {
  uri: string,
  authorization?: {
    type: 'apiKey' | 'Bearer',
    secret: string
  },
  cache?: boolean | { ttl: number },
  timeout?: number,
  signal?: GenericAbortSignal
}

export class SdkProject {
  public readonly assetType: Resource<NewAssetType, AssetType>
  public readonly asset: Resource<NewAsset, Asset>
  public readonly device: Resource<NewDevice, Device>
  public readonly deviceType: Resource<NewDeviceType, DeviceType>
  public readonly node: Resource<NewNode, Node>
  public readonly nodeType: Resource<NewNodeType, NodeType>
  public readonly plant: Resource<NewPlant, Plant>
  public readonly rule: Resource<NewRule, Rule>

  constructor(client: AxiosInstance) {
    this.assetType = new BaseResource(client, 'assetTypes')
    this.asset = new BaseResource(client, 'assets')
    this.device = new BaseResource(client, 'devices')
    this.deviceType = new BaseResource(client, 'deviceTypes')
    this.node = new BaseResource(client, 'nodes')
    this.nodeType = new BaseResource(client, 'nodetypes')
    this.plant = new BaseResource(client, 'plants')
    this.rule = new BaseResource(client, 'rules')
  }
}

class Sdk {
  constructor(private readonly configuration: Configuration) {}

  private createAxiosClient(projectId: string): AxiosInstance {
    const headers: Record<string, string> = {}

    const { authorization } = this.configuration
    if (authorization?.type === 'apiKey') {
      headers.Authorization = `apiKey ${authorization.secret}`
    } else if (authorization?.type === 'Bearer') {
      headers.Authorization = `Bearer ${authorization.secret}`
    }

    const client = axios.create({
      baseURL: this.configuration.uri + '/projects/' + projectId,
      headers,
      timeout: this.configuration.timeout,
      signal: this.configuration.signal
    })

    if (this.configuration.cache) {
      return setupCache(client, typeof this.configuration.cache === 'object' ? this.configuration.cache : undefined)
    }

    return client
  }


  project(projectId: string): SdkProject {
    const client = this.createAxiosClient(projectId)
    return new SdkProject(client)
  }
}

export default Sdk
