'use strict'

const { Resource } = require('./resource')
class DeviceTypes extends Resource {
  constructor ({ client, overrides = {} }) {
    super({
      client,
      overrides,
      name: 'DeviceTypes',
      basePath: '/devicetypes'
    })
  }
}
module.exports = DeviceTypes
