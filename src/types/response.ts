import { KnxNodeProtocol } from './protocols/knx'
import { ModbusDeviceTypeProtocol, ModbusNodeProtocol } from './protocols/modbus'

export const LocationPointTypeEnum = {
  Point: 'point'
} as const

export type LocationPointTypeEnum = typeof LocationPointTypeEnum[keyof typeof LocationPointTypeEnum];

export interface LocationPoint {
  /**
   * 
   * @type {string}
   * @memberof LocationPoint
   */
  type: LocationPointTypeEnum;
  /**
   * 
   * @type {Array<number>}
   * @memberof LocationPoint
   */
  coordinates: Array<number>;
}

export type Project = {
  uuid: string
  projectId: string
  name: string
  metadata?: object
  configuration?: object
  createdAt: Date
  updatedAt: Date
}

export interface Asset {
  /**
   * The unique identifier for the resource. It can be provided at creation, otherwise it will be generated by the api.
   * @type {string}
   * @memberof Asset
   */
  uuid: string;
  /**
   * The date (and time) at which the resource was created.
   * @type {Date}
   * @memberof Asset
   */
  createdAt: Date;
  /**
   * The date (and time) at which the resource was updated last time.
   * @type {Date}
   * @memberof Asset
   */
  updatedAt: Date;
  /**
   * A map of strings with custom content
   * @type {{ [key: string]: string; }}
   * @memberof Asset
   */
  metadata?: { [key: string]: string; };
  /**
   * The project this resource belongs to.
   * @type {string}
   * @memberof Assetqq
   */
  projectId: string;
  /**
   * A meaningful name for the resource.
   * @type {string}
   * @memberof Asset
   */
  name: string;
  /**
   * A description of the resource
   * @type {string}
   * @memberof Asset
   */
  description?: string;
  /**
   * The uuid of the asset type instance, which holds a description of this kind of assets.
   * @type {string}
   * @memberof Asset
   */
  assetTypeId?: string;
  /**
   * The id of the plant the asset belongs to. Optional.
   * @type {string}
   * @memberof Asset
   */
  plantId?: string;
  /**
   * The id of the parent asset. Optional.
   * @type {string}
   * @memberof Asset
   */
  parentId?: string;
  /**
   * An array of tags. Alphanumeric characters only.
   * @type {Array<string>}
   * @memberof Asset
   */
  tags?: Array<string>;
}

export type Device = {
  uuid: string
  projectID: string
  deviceTypeID: string
  nodeID: string
  encoder: string
  decoder: string
  firmwareVersion: string
  plantID: string
  location?: {
    latitude: number
    longitude: number
  }
  serialNumber: string
  name: string
  description: string
  deviceType: DeviceType
  metadata: object
  state: object
  stateUpdatedAt: object
  lastActivityAt: string
  lastCommunicationAt: string
  connectivityStatus: string
  lastConnectionAt: string
  lastDisconnectionAt: string
  tags: Array<string>
  createdAt: Date
  updatedAt: Date
}

export const NodeConnectivityStatusEnum = {
  Connected: 'connected',
  Disconnected: 'disconnected'
} as const
export type NodeConnectivityStatusEnum = typeof NodeConnectivityStatusEnum[keyof typeof NodeConnectivityStatusEnum];

export type NodeProtocol = {
  uuid: string
  description?: string
  metadata?: object
} & (ModbusNodeProtocol | KnxNodeProtocol)

export type Node = {
  uuid: string
  projectID: string
  plantID: string
  name: string
  model: string
  nodeTypeID: string
  serialNumber: string
  location?: {
    latitude: number
    longitude: number
  }
  protocols?: Array<NodeProtocol>
  metadata: object
  connectivityStatus: string
  lastConnectionAt: string
  lastCommunicationAt: string
  lastDisconnectionAt: string
  description: string
  tags: Array<string>
  createdAt: Date
  updatedAt: Date
}

export const LocationPolygonTypeEnum = {
  Polygon: 'polygon'
} as const
export type LocationPolygonTypeEnum = typeof LocationPolygonTypeEnum[keyof typeof LocationPolygonTypeEnum];

export interface LocationPolygon {
  /**
   * 
   * @type {string}
   * @memberof LocationPolygon
   */
  type: LocationPolygonTypeEnum;
  /**
   * 
   * @type {Array<Array<number>>}
   * @memberof LocationPolygon
   */
  coordinates: Array<Array<number>>;
}

export interface Plant {
  /**
   * The unique identifier for the resource. It can be provided at creation, otherwise it will be generated by the api.
   * @type {string}
   * @memberof Plant
   */
  uuid: string;
  /**
   * The date (and time) at which the resource was created.
   * @type {Date}
   * @memberof Plant
   */
  createdAt: Date;
  /**
   * The date (and time) at which the resource was updated last time.
   * @type {Date}
   * @memberof Plant
   */
  updatedAt: Date;
  /**
   * A map of strings with custom content
   * @type {{ [key: string]: string; }}
   * @memberof Plant
   */
  metadata?: { [key: string]: string; };
  /**
   * The project this node belongs to.
   * @type {string}
   * @memberof Plant
   */
  projectId: string;
  /**
   * A distinguishable name for the plant.
   * @type {string}
   * @memberof Plant
   */
  name: string;
  /**
   * 
   * @type {LocationPolygon}
   * @memberof Plant
   */
  location?: LocationPolygon;
  /**
   * A description of the plant
   * @type {string}
   * @memberof Plant
   */
  description?: string;
  /**
   * An array of tags. Alphanumeric characters only.
   * @type {Array<string>}
   * @memberof Plant
   */
  tags?: Array<string>;
}

export interface AssetType {
  /**
   * The unique identifier for the resource. It can be provided at creation, otherwise it will be generated by the api.
   * @type {string}
   * @memberof AssetType
   */
  uuid: string;
  /**
   * The date (and time) at which the resource was created.
   * @type {Date}
   * @memberof AssetType
   */
  createdAt: Date;
  /**
   * The date (and time) at which the resource was updated last time.
   * @type {Date}
   * @memberof AssetType
   */
  updatedAt: Date;
  /**
   * A map of strings with custom content
   * @type {{ [key: string]: string; }}
   * @memberof AssetType
   */
  metadata?: { [key: string]: string; };
  /**
   * The project this node belongs to.
   * @type {string}
   * @memberof AssetType
   */
  projectId: string;
  /**
   * A distinguishable name for the asset type.
   * @type {string}
   * @memberof AssetType
   */
  name: string;
  /**
   * Name of the asset manufacturer.
   * @type {string}
   * @memberof AssetType
   */
  manufacturer?: string;
  /**
   * A description of the asset type
   * @type {string}
   * @memberof AssetType
   */
  description?: string;
  /**
   * The broad category of device, like Dish Washer, Hair Drier etc..
   * @type {string}
   * @memberof AssetType
   */
  category?: string;
}

export const DeviceTypePropertyTypeEnum = {
  Boolean: 'boolean',
  Number: 'number',
  Integer: 'integer',
  Double: 'double',
  String: 'string'
} as const
export type DeviceTypePropertyTypeEnum = typeof DeviceTypePropertyTypeEnum[keyof typeof DeviceTypePropertyTypeEnum];

export interface DeviceTypeProperty {
  /**
   * Unit of measurement
   * @type {string}
   * @memberof DeviceTypeProperty
   */
  uom: string;
  /**
   * A description of the property
   * @type {string}
   * @memberof DeviceTypeProperty
   */
  description?: string;
  /**
   * A label for the property
   * @type {string}
   * @memberof DeviceTypeProperty
   */
  displayName: string;
  /**
   * A type for the values of this property
   * @type {string}
   * @memberof DeviceTypeProperty
   */
  type: DeviceTypePropertyTypeEnum;
  /**
   * Defines which kind of aggregations should be done on the raw data corresponding to this property.
   * @type {Array<string>}
   * @memberof DeviceTypeProperty
   */
  aggregations: Array<string>;
}

export type DeviceType = {
  uuid: string
  projectID: string
  visibility: string
  encoder: string
  decoder: string
  firmwareID: string
  firmwareVersions: Array<string>
  model: string
  manufacturer: string
  category: string
  name: string
  description: string
  protocols?: {
    modbus?: ModbusDeviceTypeProtocol
  }
  metadata: object
  commands: object
  events: object
  properties: object
  createdAt: Date
  updatedAt: Date
}

export interface NodeType {
  /**
   * The unique identifier for the resource. It can be provided at creation, otherwise it will be generated by the api.
   * @type {string}
   * @memberof NodeType
   */
  uuid: string;
  /**
   * The date (and time) at which the resource was created.
   * @type {Date}
   * @memberof NodeType
   */
  createdAt: Date;
  /**
   * The date (and time) at which the resource was updated last time.
   * @type {Date}
   * @memberof NodeType
   */
  updatedAt: Date;
  /**
   * A map of strings with custom content
   * @type {{ [key: string]: string; }}
   * @memberof NodeType
   */
  metadata?: { [key: string]: string; };
  /**
   * A distinguishable name for the node type.
   * @type {string}
   * @memberof NodeType
   */
  name: string;
  /**
   * Name of the manufacturer.
   * @type {string}
   * @memberof NodeType
   */
  manufacturer?: string;
  /**
   * Name of the model.
   * @type {string}
   * @memberof NodeType
   */
  model?: string;
  /**
   * A description of the node type
   * @type {string}
   * @memberof NodeType
   */
  description?: string;
  /**
   * Name of an encoder function.
   * @type {string}
   * @memberof NodeType
   */
  encoder?: string;
  /**
   * Name of a decoder function.
   * @type {string}
   * @memberof NodeType
   */
  decoder?: string;
  /**
   * Array of possible firmware versions
   * @type {Array<any>}
   * @memberof NodeType
   */
  firmwareVersions?: Array<unknown>;
}

export type RuleAction = {
	type: 'log' | 'command' | 'webhook'
	value?: string
	uri?: string
	payload?: string
	command?: Record<string, unknown>
	deviceId?: string
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
	tags?: Array<string>
	projectId: string
	mode:  'cloud' | 'edge'
	enabled: boolean
	triggers: Array<RuleTrigger>
	condition?: RuleCondition
	actions: Array<RuleAction>
	elseActions?: Array<RuleAction>
	createdAt: Date
	cpdatedAt: Date
}
