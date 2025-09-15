export type HttpPollingNodeProtocol = {
  name: 'http-polling'
  configuration: {
    uri: string,
    mapping: Record<string, any>
  }
}