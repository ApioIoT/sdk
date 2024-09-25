type ModbusTcpConfiguration = {
  type: 'tcp' | 'udp'
  ip: string
  port: number
}

type ModbusRtuConfiguration = {
  type: 'rtu'
  dev: string
  baudRate: number
  dataBits: number
  stopBits: number
  parity: 'none' | 'even' | 'odd'
}

export type ModbusNodeProtocol = {
  name: 'modbus'
  configuration: {
    readingFrequency: number | 'onchange'
    cloudFrequency: number | 'onchange'
    edgeFrequency: number | 'onchange'
    mapping?: Record<string, { address: number }>
  } & (ModbusTcpConfiguration | ModbusRtuConfiguration)
}

export type ModbusDeviceTypeProtocol = {
  registers: Array<{
    register: number
    modbusFunction: number
    words: number
    properties: Array<{
      index: number
      name: string
    }>
    type: string
  }>
}