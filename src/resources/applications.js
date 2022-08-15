'use strict'

const { Resource } = require('./resource')
class Applications extends Resource {
  constructor ({ client, overrides = {} }) {
    super({
      client,
      overrides,
      name: 'Applications',
      basePath: '/applications'
    })
  }
}
module.exports = Applications
