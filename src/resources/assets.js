'use strict'

const { Resource } = require('./resource')
class Assets extends Resource {
  constructor ({ client, overrides = {} }) {
    super({
      client,
      overrides,
      name: 'Assets',
      basePath: '/assets'
    })
  }
}
module.exports = Assets
