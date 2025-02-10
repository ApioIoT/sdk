export type LorawanNodeProtocol = {
  name: 'lorawan'
  configuration: {
    mapping: {
      [key: string]: {
        deviceEUI: string,
        fPort?: number
      }
    }
  }
}