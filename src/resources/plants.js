'use strict'

const { Resource } = require('./resource')
class Plant extends Resource {
  constructor (client) {
    super({
      client,
      name: 'Plants',
      basePath: '/plants'
    })
  }
}
module.exports = Plant
