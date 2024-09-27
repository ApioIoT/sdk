export type KnxNodeProtocol = {
  name: 'knx'
  configuration: {
    ip: string
    port: number
    physAddr: string
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
