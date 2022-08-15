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
    apiBaseUrl = 'https://api.apio.network',
    apiKey,
    projectId,
    apiVersion = 'v1',
    options,
    resourceOverrides = {}
  }) {
    this.apiBaseUrl = apiBaseUrl
    this.apiKey = apiKey
    this.projectId = projectId
    this.apiVersion = apiVersion
    this.options = options || defaultOptions

    for (const resourceName in resources) {
      this[resourceName] = new resources[resourceName]({ client: this, overrides: resourceOverrides[resourceName] })
    }
  }

  async request (opts) {
    opts.headers = opts.headers || {}
    opts.headers['User-Agent'] = 'ApioIoT/NodeJS'
    opts.headers['X-sdk-version'] = manifest.version
    opts.headers['X-sdk-variant'] = 'nodejs'
    if (!opts.headers.Authorization) {
      opts.headers.Authorization = this.apiKey
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

  Get ({ path, query = {}, options = {} }) {
    return this.request({
      method: 'GET',
      headers: {
        Authorization: `apikey ${this.apiKey}`
      },
      url: `${this.apiBaseUrl}/projects/${this.projectId}${path}`,
      query
    })
  }

  Delete ({ path, query = {}, options = {} }) {
    return this.request({
      method: 'DELETE',
      headers: {
        Authorization: `apikey ${this.apiKey}`
      },
      url: `${this.apiBaseUrl}/projects/${this.projectId}${path}`,
      query
    })
  }

  Post ({ path, body = {}, options = {} }) {
    return this.request({
      method: 'POST',
      headers: {
        Authorization: `apikey ${this.apiKey}`
      },
      url: `${this.apiBaseUrl}/projects/${this.projectId}${path}`,
      body
    })
  }

  Put ({ path, body = {}, query = {}, options = {} }) {
    return this.request({
      method: 'PUT',
      headers: {
        Authorization: `apikey ${this.apiKey}`
      },
      url: `${this.apiBaseUrl}/projects/${this.projectId}${path}`,
      body,
      query
    })
  }
}

module.exports = { Client }
