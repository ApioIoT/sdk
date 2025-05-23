export type KnxNodeProtocol = {
  name: 'knx'
  configuration: {
    ip: string
    port: number
    physAddr: string
    mapping?: Record<
      string,
      {
        reading?: 'event' | 'polling',
        pollingConfig?: {
          readingFrequency: number
          cloudFrequency: number | 'onchange'
          edgeFrequency: number | 'onchange'
        },
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
