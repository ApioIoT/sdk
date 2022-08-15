'use strict'

const { Resource } = require('./resource')
class AssetTypes extends Resource {
  constructor ({ client, overrides = {} }) {
    super({
      client,
      overrides,
      name: 'AssetTypes',
      basePath: '/assettypes'
    })
  }
}
module.exports = AssetTypes
