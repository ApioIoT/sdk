import { 
  Asset, 
  AssetType, 
  Command, 
  Device, 
  DeviceType, 
  Node, 
  NodeType, 
  Plant, 
  RuleAction, 
  RuleCondition, 
  RuleTrigger 
} from './response'

type hiddenFields = 'uuid' | 'createdAt' | 'updatedAt'

export type NewAssetType = Omit<AssetType, hiddenFields>
export type NewAsset = Omit<Asset, hiddenFields>
export type NewDevice = Omit<Device, hiddenFields>
export type NewDeviceType = Omit<DeviceType, hiddenFields>
export type NewNode = Omit<Node, hiddenFields>
export type NewNodeType = Omit<NodeType, hiddenFields>
export type NewPlant = Omit<Plant, hiddenFields>
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

type commandHiddenFields = 'uuid' | 'status' | 'createdAt' | 'updatedAt' | 'receivedAt' | 'completedAt' | 'failedAt'
export type NewCommand = Omit<Command, commandHiddenFields>
