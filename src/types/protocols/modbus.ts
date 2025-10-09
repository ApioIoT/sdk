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
  endianness: 'ABCD' | 'CDAB' | 'BADC' | 'DCBA'
  registers: {
    type?: 'uint' | 'int' | 'float' | 'double'
    register: number
    read: boolean
    modbusFunctionRead?: number
    write: boolean,
    modbusFunctionWrite?: number
    words?: number
    bitwiseReading: boolean
    properties: {
      index: number
      name: string
    }[]
  }[]
}