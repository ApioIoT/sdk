export type KnxNodeProtocol = {
  name: 'knx'
  configuration: {
    ip: string
    port: number
    physAddr: string
    mapping?: Record<
      string,
      Record<
        string,
        {
          send: string
          receive: string
        }
      >
    >
  }
}

export type KnxDeviceTypeProtocol = {
  properties: Record<string, {
    address: string
    sendDPT: string
    receiveDPT: string
  }>
}