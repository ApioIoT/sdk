import { Asset, AssetType, Device, DeviceType, Node, NodeType, Plant } from './response'

type hiddenFields = 'uuid' | 'createdAt' | 'updatedAt'

export type NewAssetType = Omit<AssetType, hiddenFields>
export type NewAsset = Omit<Asset, hiddenFields>
export type NewDevice = Omit<Device, hiddenFields>
export type NewDeviceType = Omit<DeviceType, hiddenFields>
export type NewNode = Omit<Node, hiddenFields>
export type NewNodeType = Omit<NodeType, hiddenFields>
export type NewPlant = Omit<Plant, hiddenFields>
