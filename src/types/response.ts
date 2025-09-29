import { z } from 'zod'

import { KnxNodeProtocol } from './protocols/knx'
import { LorawanNodeProtocol } from './protocols/lorawan'
import { ModbusDeviceTypeProtocol, ModbusNodeProtocol } from './protocols/modbus'
import { HttpPollingNodeProtocol } from './protocols/http-polling'
 
const MetadataSchema = z.record(z.string(), z.any())
type Metadata = z.infer<typeof MetadataSchema>

export enum LocationPointTypeEnum {
  Point = 'point'
}

export type LocationPoint = {
  type: LocationPointTypeEnum
  coordinates: number[]
}

export type Project = {
  uuid: string
  projectId: string
  name: string
  metadata?: Metadata
  configuration?: Record<string, any>,
  createdAt: Date
  updatedAt: Date
}

export type Asset = {
  uuid: string
  createdAt: Date
  updatedAt: Date
  metadata?: Metadata
  projectId: string
  name: string
  description?: string
  assetTypeId?: string
  plantId?: string
  parentId?: string
  tags?: string[]
}

export type Device = {
  uuid: string
  projectId: string
  deviceTypeId: string
  nodeId: string
  encoder: string
  decoder: string
  firmwareVersion: string
  plantId: string
  location?: {
    latitude: number
    longitude: number
  }
  serialNumber: string
  name: string
  description: string
  deviceType: DeviceType
  metadata: Metadata
  state: Record<string, any>,
  stateUpdatedAt: Record<string, any>,
  lastActivityAt: string
  lastCommunicationAt: string
  connectivityStatus: string
  lastConnectionAt: string
  lastDisconnectionAt: string
  tags: string[]
  createdAt: Date
  updatedAt: Date
}

export enum NodeConnectivityStatusEnum {
  Connected = 'connected',
  Disconnected = 'disconnected'
}

export type NodeProtocol = {
  uuid: string
  description?: string
  metadata?: Metadata
} & (ModbusNodeProtocol | KnxNodeProtocol | LorawanNodeProtocol | HttpPollingNodeProtocol)

export type Node = {
  uuid: string
  projectId: string
  plantId: string
  name: string
  model: string
  nodeTypeId: string
  serialNumber: string
  location?: {
    latitude: number
    longitude: number
  }
  protocols?: NodeProtocol[]
  metadata: Metadata
  connectivityStatus: string
  lastConnectionAt: string
  lastCommunicationAt: string
  lastDisconnectionAt: string
  description: string
  tags: string[]
  rules?: string[]
  createdAt: Date
  updatedAt: Date
}

export enum LocationPolygonTypeEnum {
  Polygon = 'polygon'
}

export type LocationPolygon = {
  type: LocationPolygonTypeEnum
  coordinates: number[][]
}

export type Plant = {
  uuid: string
  createdAt: Date
  updatedAt: Date
  metadata?: Metadata
  projectId: string
  name: string
  location?: LocationPolygon
  description?: string
  tags?: string[]
}

export type AssetType = {
  uuid: string
  createdAt: Date
  updatedAt: Date
  metadata?: Metadata
  projectId: string
  name: string
  manufacturer?: string
  description?: string
  category?: string
}

export enum DeviceTypePropertyTypeEnum {
  Boolean = 'boolean',
  Number = 'number',
  Integer = 'integer',
  Double = 'double',
  String = 'string'
}

export type DeviceTypeProperty = {
  uom: string
  description?: string
  displayName: string
  type: DeviceTypePropertyTypeEnum
  aggregations: string[]
}

export type DeviceType = {
  uuid: string
  projectId: string
  visibility: string
  encoder: string
  decoder: string
  firmwareId: string
  firmwareVersions: string[]
  model: string
  manufacturer: string
  category: string
  name: string
  description: string
  protocols?: {
    modbus?: ModbusDeviceTypeProtocol
  }
  metadata: Metadata
  commands: Record<string, any>,
  events: Record<string, any>,
  properties: Record<string, any>,
  createdAt: Date
  updatedAt: Date
}

export type NodeType = {
  uuid: string
  createdAt: Date
  updatedAt: Date
  metadata?: Metadata
  name: string
  manufacturer?: string
  model?: string
  description?: string
  encoder?: string
  decoder?: string
  firmwareVersions?: any[]
}

export type RuleAction = {
  type: 'log'
	value: string
} | {
  type: 'command'
  command: Record<string, any>
  deviceId: string
} | {
  type: 'webhook'
  uri: string
  payload: string
} | {
  type: 'wasm'
  label?: string
  language: 'as'
  source: string
  binary?: string
  hash: string
} | {
  type: 'delay'
  time: number
}

export type RuleTrigger = {
	type: 'telemetry' | 'cron' | 'event'
	deviceId?: string
	property?: string
	crontab?:  string
	topic?: string
}

export type RuleCondition = {
  devices: Record<string, string>
  condition: string
  deadline?: number
}

export type Rule = {
	uuid: string
	name: string
	description?: string
	tags?: string[]
	mode:  'cloud' | 'edge'
  status: 'enabled' | 'pending' | 'rejected' | 'disabled'
  metadata?: Metadata
	projectId: string
  allowConcurrent: boolean
	triggers: RuleTrigger[]
	condition?: RuleCondition
	actions: RuleAction[]
	elseActions?: RuleAction[]
	createdAt: Date
	cpdatedAt: Date
}

export const MeasureSchema = z.object({
  projectId: z.string(),
  deviceId: z.string(),
  timestamp: z.number(),
  name: z.string(),
  value: z.number()
})

export type Measure = z.infer<typeof MeasureSchema>

const CommandParametersSchema = z.record(z.string(), z.any())

export type CommandParameters = z.infer<typeof CommandParametersSchema>

export const CommandSchema = z.object({
  uuid: z.string(),
  name: z.string(),
  status: z.enum(['pending', 'received', 'completed', 'failed']),
  projectId: z.string(),
  nodeId: z.string().optional(),
  deviceId: z.string().optional(),
  parameters: z.array(CommandParametersSchema).or(CommandParametersSchema),
  metadata: MetadataSchema.optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  receivedAt: z.string().optional(),
  completedAt: z.string().optional(),
  failedAt: z.string().optional()
})

export type Command = z.infer<typeof CommandSchema>
