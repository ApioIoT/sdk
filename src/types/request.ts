import {
  Asset,
  AssetType,
  Device,
  DeviceType,
  Node,
  NodeType,
  Plant,
  RuleAction,
  RuleCondition,
  RuleTrigger
} from './response'

type resourceHiddenFields = 'uuid' | 'createdAt' | 'updatedAt'
export type NewAssetType = Omit<AssetType, resourceHiddenFields>
export type NewAsset = Omit<Asset, resourceHiddenFields>
export type NewDevice = Omit<Device, resourceHiddenFields>
export type NewDeviceType = Omit<DeviceType, resourceHiddenFields>
export type NewNode = Omit<Node, resourceHiddenFields>
export type NewNodeType = Omit<NodeType, resourceHiddenFields>
export type NewPlant = Omit<Plant, resourceHiddenFields>
export type NewRule = {
	name: string
	description?: string
	tags?: string[]
	mode:  'cloud' | 'edge'
	triggers: RuleTrigger[]
	condition?: RuleCondition
	actions: RuleAction[]
	elseActions?: RuleAction[]
}

export type NewCommand = {
  name: string
  projectId: string
  nodeId?: string
  deviceId?: string
  parameters: Record<string, any> | Record<string, any>[]
  downlinkRetry?: {
    maxRetries?: number
  }
  executionRetry?: {
    maxRetries?: number
  }
  metadata?: Record<string, any>
}
