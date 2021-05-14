'use strict'

const path = require('path')
const fs = require('fs')

const resources = {}

fs
  .readdirSync(path.join(__dirname, 'resources'))
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== 'resource.js')
  })
  .forEach(file => {
    const name = file.replace('.js', '')
    resources[name] = require(path.join(__dirname, 'resources', file))
  })

module.exports = resources
