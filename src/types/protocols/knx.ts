export type KnxNodeProtocol = {
  name: 'knx'
  configuration: {
    ip: string
    port: number
    physAddr: string
    readingFrequency: number | 'onchange'
    cloudFrequency: number | 'onchange'
    edgeFrequency: number | 'onchange'
    mapping?: Record<
      string,
      {
        address: string
        properties: Record<
          string,
          {
            send: string
            sendDPT: string
            receive: string
            receiveDPT: string
          }
        >
      }
    >
  }
}
