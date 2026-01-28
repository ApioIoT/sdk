import { before, test } from 'node:test'
import { strictEqual } from 'node:assert'
import nock from 'nock'

import Sdk from '../src/sdk/sdk'
import { AuthenticationError, ConfigurationError, NotFoundError, AbortError } from '../src/types'

import projects from './mock/projects.json'
import project from './mock/project.json'
import nodes from './mock/nodes.json'
import node from './mock/node.json'
import devices from './mock/devices.json'
import device from './mock/device.json'
import deviceType from './mock/devicetype.json'
import deviceTypes from './mock/devicetypes.json'
import rules from './mock/rules.json'
import rule from './mock/rule.json'

const API_URI = 'http://api.example.com'
const API_KEY = 'my-api-key'
const PROJECT_ID = 'my-project-id'
const NODE_ID = 'my-node-id'
const DEVICE_ID = 'my-device-id'
const DEVICE_TYPE_ID = 'my-devicetype-id'
const RULE_ID = 'my-rule-id'

before(() => {
  nock(API_URI)
    .persist()
    .matchHeader('Authorization', `apiKey ${API_KEY}`)
    .get('/projects')
    .reply(200, projects)
  nock(API_URI)
    .persist()
    .matchHeader('Authorization', `apiKey ${API_KEY}`)
    .get(`/projects/${PROJECT_ID}/`)
    .reply(200, project)
  nock(API_URI)
    .persist()
    .get(`/projects/${PROJECT_ID}/nodes`)
    .reply(function () {
      const auth = this.req.headers['authorization']
      if (auth === `apiKey ${API_KEY}`) {
        return [200, nodes]
      } else {
        return [401, {}]
      }
    })
  nock(API_URI)
    .persist()
    .matchHeader('Authorization', `apiKey ${API_KEY}`)
    .get(`/projects/${PROJECT_ID}/nodes/${NODE_ID}`)
    .reply(200, node)
  nock(API_URI)
    .persist()
    .matchHeader('Authorization', `apiKey ${API_KEY}`)
    .get(`/projects/${PROJECT_ID}/nodes/123`)
    .reply(404, {})
  nock(API_URI)
    .persist()
    .matchHeader('Authorization', `apiKey ${API_KEY}`)
    .get(`/projects/${PROJECT_ID}/devices`)
    .reply(200, devices)
  nock(API_URI)
    .persist()
    .matchHeader('Authorization', `apiKey ${API_KEY}`)
    .get(`/projects/${PROJECT_ID}/deviceTypes`)
    .reply(200, deviceTypes)
  nock(API_URI)
    .persist()
    .matchHeader('Authorization', `apiKey ${API_KEY}`)
    .get(`/projects/${PROJECT_ID}/deviceTypes/${DEVICE_TYPE_ID}`)
    .reply(200, deviceType)
  nock(API_URI)
    .persist()
    .matchHeader('Authorization', `apiKey ${API_KEY}`)
    .get(`/projects/${PROJECT_ID}/deviceTypes/123`)
    .reply(404, {})
  nock(API_URI)
    .persist()
    .matchHeader('Authorization', `apiKey ${API_KEY}`)
    .get(`/projects/${PROJECT_ID}/devices/${DEVICE_ID}`)
    .reply(200, device)
  nock(API_URI)
    .persist()
    .matchHeader('Authorization', `apiKey ${API_KEY}`)
    .get(`/projects/${PROJECT_ID}/devices/123`)
    .reply(404, {})
  nock(API_URI)
    .persist()
    .matchHeader('Authorization', `apiKey ${API_KEY}`)
    .get(`/projects/${PROJECT_ID}/rules`)
    .reply(200, rules)
  nock(API_URI)
    .persist()
    .matchHeader('Authorization', `apiKey ${API_KEY}`)
    .get(`/projects/${PROJECT_ID}/rules`)
    .query({ enabled: true, mode: 'edge' })
    .reply(200, rules)
  nock(API_URI)
    .persist()
    .matchHeader('Authorization', `apiKey ${API_KEY}`)
    .get(`/projects/${PROJECT_ID}/rules/${RULE_ID}`)
    .reply(200, rule)
  nock(API_URI)
    .persist()
    .matchHeader('Authorization', `apiKey ${API_KEY}`)
    .put(`/projects/${PROJECT_ID}/rules/${RULE_ID}`)
    .reply(200, {})
})

test('test ConfigurationError', async () => {
  const sdk = new Sdk({
    uri: 'asd',
    authorization: {
      type: 'apiKey',
      secret: API_KEY
    }
  })
  const project = sdk.project(PROJECT_ID)

  try {
    await project.node.findAll()
  } catch (e) {
    if (!(e instanceof ConfigurationError)) {
      throw new Error('Error must be ConfigurationError')
    }
  }
})

test('test AuthenticationError', async () => {
  const sdk = new Sdk({
    uri: API_URI,
    authorization: {
      type: 'apiKey',
      secret: 'lol'
    }
  })
  const project = sdk.project(PROJECT_ID)

  try {
    await project.node.findAll()
  } catch (e) {
    if (!(e instanceof AuthenticationError)) {
      throw new Error('Error must be AuthenticationError')
    }
  }
})

test('get nodes', async () => {
  const sdk = new Sdk({
    uri: API_URI,
    authorization: {
      type: 'apiKey',
      secret: API_KEY
    }
  })
  const project = sdk.project(PROJECT_ID)

  const nodes = await project.node.findAll()
  if (!(nodes instanceof Array)) {
    throw new Error('Nodes Types must be array')
  }
})

test('get node', async () => {
  const sdk = new Sdk({
    uri: API_URI,
    authorization: {
      type: 'apiKey',
      secret: API_KEY
    }
  })
  const project = sdk.project(PROJECT_ID)

  const node = await project.node.findById(NODE_ID)
  strictEqual(node.uuid, NODE_ID)
})

test('get fake node', async () => {
  const sdk = new Sdk({
    uri: API_URI,
    authorization: {
      type: 'apiKey',
      secret: API_KEY
    }
  })
  const project = sdk.project(PROJECT_ID)

  try {
    await project.node.findById('123')
  } catch (e) {
    if (!(e instanceof NotFoundError)) {
      throw new Error('Error must be NotFoundError')
    }
  }
})

test('get devices', async () => {
  const sdk = new Sdk({
    uri: API_URI,
    authorization: {
      type: 'apiKey',
      secret: API_KEY
    }
  })
  const project = sdk.project(PROJECT_ID)

  const devices = await project.device.findAll()
  if (!(devices instanceof Array)) {
    throw new Error('Devices must be array')
  }
})

test('get device', async () => {
  const sdk = new Sdk({
    uri: API_URI,
    authorization: {
      type: 'apiKey',
      secret: API_KEY
    }
  })
  const project = sdk.project(PROJECT_ID)

  const device = await project.device.findById(DEVICE_ID)
  strictEqual(device.uuid, DEVICE_ID)
})

test('get fake device', async () => {
  const sdk = new Sdk({
    uri: API_URI,
    authorization: {
      type: 'apiKey',
      secret: API_KEY
    }
  })
  const project = sdk.project(PROJECT_ID)

  try {
    await project.device.findById('123')
  } catch (e) {
    if (!(e instanceof NotFoundError)) {
      throw new Error('Error must be NotFoundError')
    }
  }
})

test('get device types', async () => {
  const sdk = new Sdk({
    uri: API_URI,
    authorization: {
      type: 'apiKey',
      secret: API_KEY
    }
  })
  const project = sdk.project(PROJECT_ID)

  const deviceTypes = await project.deviceType.findAll()
  if (!(deviceTypes instanceof Array)) {
    throw new Error('Device Types must be array')
  }
})

test('get device type', async () => {
  const sdk = new Sdk({
    uri: API_URI,
    authorization: {
      type: 'apiKey',
      secret: API_KEY
    }
  })
  const project = sdk.project(PROJECT_ID)

  const deviceType = await project.deviceType.findById(DEVICE_TYPE_ID)
  strictEqual(deviceType.uuid, DEVICE_TYPE_ID)
})

test('get fake device type', async () => {
  const sdk = new Sdk({
    uri: API_URI,
    authorization: {
      type: 'apiKey',
      secret: API_KEY
    }
  })
  const project = sdk.project(PROJECT_ID)

  try {
    await project.deviceType.findById('123')
  } catch (e) {
    if (!(e instanceof NotFoundError)) {
      throw new Error('Error must be NotFoundError')
    }
  }
})

test('test Timeout', async () => {
  const sdk = new Sdk({
    uri: API_URI,
    authorization: {
      type: 'apiKey',
      secret: 'lol'
    },
    timeout: 1
  })
  const project = sdk.project(PROJECT_ID)

  try {
    await project.node.findAll()
  } catch (e) {
    if (!(e instanceof AbortError)) {
      throw new Error('Error must be AbortError')
    }
  }
})

test('test Cancellation with timeout', async () => {
  const sdk = new Sdk({
    uri: API_URI,
    authorization: {
      type: 'apiKey',
      secret: 'lol'
    },
    signal: AbortSignal.timeout(1)
  })
  const project = sdk.project(PROJECT_ID)

  try {
    await project.node.findAll()
  } catch (e) {
    if (!(e instanceof AbortError)) {
      throw new Error('Error must be AbortError')
    }
  }
})

test('test Cancellation with abort', async () => {
  const controller = new AbortController()
  
  const sdk = new Sdk({
    uri: API_URI,
    authorization: {
      type: 'apiKey',
      secret: 'lol'
    },
    signal: controller.signal
  })
  const project = sdk.project(PROJECT_ID)

  controller.abort()

  try {
    await project.node.findAll()
  } catch (e) {
    if (!(e instanceof AbortError)) {
      throw new Error('Error must be AbortError')
    }
  }
})

test('get rules', async () => {
  const sdk = new Sdk({
    uri: API_URI,
    authorization: {
      type: 'apiKey',
      secret: API_KEY
    }
  })
  const project = sdk.project(PROJECT_ID)

  const rules = await project.rule.findAll()
  if (!(rules instanceof Array)) {
    throw new Error('Rules must be array')
  }
})

test('get rule', async () => {
  const sdk = new Sdk({
    uri: API_URI,
    authorization: {
      type: 'apiKey',
      secret: API_KEY
    }
  })
  const project = sdk.project(PROJECT_ID)

  const rule = await project.rule.findById(RULE_ID)
  strictEqual(rule.uuid, RULE_ID)
})

test('get edge rules', async () => {
  const sdk = new Sdk({
    uri: API_URI,
    authorization: {
      type: 'apiKey',
      secret: API_KEY
    }
  })
  const project = sdk.project(PROJECT_ID)

  const rules = await project.rule.findAll({
    mode: 'edge',
    enabled: true
  })
  if (!(rules instanceof Array)) {
    throw new Error('Rules must be array')
  }
})

test('test update rule', async () => {
  const sdk = new Sdk({
    uri: API_URI,
    authorization: {
      type: 'apiKey',
      secret: API_KEY
    }
  })
  const project = sdk.project(PROJECT_ID)

  const rule = await project.rule.findAll()
  await project.rule.updateById(rule[0].uuid, rule[0])
})
