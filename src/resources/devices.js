'use strict'

const { Resource } = require('./resource')
class Device extends Resource {
  constructor (client) {
    super({
      client,
      name: 'Devices',
      basePath: '/devices'
    })
  }
}
module.exports = Device
