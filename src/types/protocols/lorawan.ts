export type LorawanNodeProtocol = {
  name: 'lorawan'
  configuration: {
    applicationId: string,
    mapping: {
      [key: string]: {
        deviceEUI: string,
        fPort?: number
      }
    }
  }
}