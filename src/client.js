'use strict'

const resources = require('./resources')
const request = require('@fatmatto/ptth')
const manifest = require('../package.json')
const defaultOptions = {
  rejectApiErrors: false
}

class ApiError extends Error {

}

class Client {
  constructor ({
    apiBaseUrl = 'http://api.iot.apio.network',
    apiKey,
    projectId,
    apiVersion = 'v1',
    options
  }) {
    this.apiBaseUrl = apiBaseUrl
    this.apiKey = apiKey
    this.projectId = projectId
    this.apiVersion = apiVersion
    this.options = options || defaultOptions

    for (const resourceName in resources) {
      this[resourceName] = new resources[resourceName](this)
    }
  }

  async request (opts) {
    opts.headers = opts.headers || {}
    opts.headers['User-Agent'] = 'ApioIoT/1.0 NodeJS'
    opts.headers['X-sdk-version'] = manifest.version
    opts.headers['X-sdk-variant'] = 'nodejs'
    if (!opts.headers.Authorization) {
      opts.headers.authorization = this.apiKey
    }
    const response = await request(opts)

    if (this.options.rejectApiErrors === true && response.statusCode >= 400) {
      let message = `Unkown error: ${JSON.stringify(response.body)}`
      if (response.body && response.body.error && response.body.error.message) {
        message = response.body.error.message
      }
      throw new ApiError(`Request failed with status ${response.statusCode}: ${message}`)
    }

    return response.body
  }

  Get (path, query = {}, options = {}) {
    return this.request({
      method: 'GET',
      url: `${this.apiBaseUrl}/projects/${this.projectId}${path}`,
      query: query
    })
  }
}

module.exports = { Client }
