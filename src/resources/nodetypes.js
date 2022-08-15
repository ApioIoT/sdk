'use strict'

const { Resource } = require('./resource')
class NodeTypes extends Resource {
  constructor ({ client, overrides = {} }) {
    super({
      client,
      overrides,
      name: 'NodeTypes',
      basePath: '/nodetypes'
    })
  }
}
module.exports = NodeTypes
