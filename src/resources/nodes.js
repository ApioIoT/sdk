'use strict'

const { Resource } = require('./resource')
class Node extends Resource {
  constructor (client) {
    super({
      client,
      name: 'Nodes',
      basePath: '/nodes'
    })
  }
}
module.exports = Node
