'use strict'

const { Resource } = require('./resource')
class Node extends Resource {
  constructor ({ client, overrides }) {
    super({
      client,
      overrides,
      name: 'Nodes',
      basePath: '/nodes'
    })
  }
}
module.exports = Node
