'use strict'

const { Resource } = require('./resource')
class Plant extends Resource {
  constructor ({ client, overrides }) {
    super({
      client,
      overrides,
      name: 'Plants',
      basePath: '/plants'
    })
  }
}
module.exports = Plant
