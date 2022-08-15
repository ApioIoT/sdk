'use strict'

const { Resource } = require('./resource')
class Devices extends Resource {
  constructor ({ client, overrides = {} }) {
    super({
      client,
      overrides,
      name: 'Devices',
      basePath: '/devices'
    })
  }
}
module.exports = Devices
