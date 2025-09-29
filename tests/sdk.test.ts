import 'dotenv/config'

import Sdk from '../src/sdk/sdk'

import { AuthenticationError, ConfigurationError, NotFoundError, AbortError } from '../src/types'

const sdk = new Sdk({
  uri: process.env.BASE_URI!,
  authorization: {
    type: 'apiKey',
    secret: process.env.API_KEY!
  }
})
const project = sdk.project(process.env.PROJECT_ID!)

describe('Testing SDK', () => {
  test('test ConfigurationError', async () => {
    const sdk = new Sdk({
      uri: 'asd',
      authorization: {
        type: 'apiKey',
        secret: process.env.API_KEY!
      }
    }).project(process.env.PROJECT_ID!)

    await expect(sdk.node.findAll())
      .rejects
      .toThrow(ConfigurationError)
  })

  test('test AuthenticationError', async () => {
    const sdk = new Sdk({
      uri: process.env.BASE_URI!,
      authorization: {
        type: 'apiKey',
        secret: 'lol'
      }
    }).project(process.env.PROJECT_ID!)

    await expect(sdk.node.findAll())
      .rejects
      .toThrow(AuthenticationError)
  })

  test('get nodes', async () => {
    await expect(project.node.findAll())
      .resolves
      .toBeInstanceOf(Array)
  })

  test('get node', async () => {
    await expect(project.node.findById(process.env.TEST_NODE_UUID!))
      .resolves
      .toHaveProperty('uuid', process.env.TEST_NODE_UUID!)
  })

  test('get fake node', async () => {
    await expect(project.node.findById('123'))
      .rejects
      .toThrow(NotFoundError)
  })

  test('get devices', async () => {
    await expect(project.device.findAll())
      .resolves
      .toBeInstanceOf(Array)
  })

  test('get device', async () => {
    await expect(project.device.findById(process.env.TEST_DEVICE_UUID!))
      .resolves
      .toHaveProperty('uuid', process.env.TEST_DEVICE_UUID!)
  })

  test('get fake device', async () => {
    await expect(project.device.findById('123'))
      .rejects
      .toThrow(NotFoundError)
  })

  test('get device types', async () => {
    await expect(project.deviceType.findAll())
      .resolves
      .toBeInstanceOf(Array)
  })

  test('get device type', async () => {
    await expect(project.deviceType.findById(process.env.TEST_DEVICE_TYPE_UUID!))
      .resolves
      .toHaveProperty('uuid', process.env.TEST_DEVICE_TYPE_UUID!)
  })

  test('get fake device type', async () => {
    await expect(project.deviceType.findById('123'))
      .rejects
      .toThrow(NotFoundError)
  })

  test('test Timeout', async () => {
    const sdk = new Sdk({
      uri: process.env.BASE_URI!,
      authorization: {
        type: 'apiKey',
        secret: 'lol'
      },
      timeout: 1
    }).project(process.env.PROJECT_ID!)

    await expect(sdk.node.findAll())
      .rejects
      .toThrow(AbortError)
  })

  test('test Cancellation with timeout', async () => {
    const sdk = new Sdk({
      uri: process.env.BASE_URI!,
      authorization: {
        type: 'apiKey',
        secret: 'lol'
      },
      signal: AbortSignal.timeout(1)
    }).project(process.env.PROJECT_ID!)

    await expect(sdk.node.findAll())
      .rejects
      .toThrow(AbortError)
  })

  test('test Cancellation with abort', async () => {
    const controller = new AbortController()
    
    const sdk = new Sdk({
      uri: process.env.BASE_URI!,
      authorization: {
        type: 'apiKey',
        secret: 'lol'
      },
      signal: controller.signal
    }).project(process.env.PROJECT_ID!)

    controller.abort()

    await expect(sdk.node.findAll())
      .rejects
      .toThrow(AbortError)
  })

  test('get rules', async () => {
    await expect(project.rule.findAll())
      .resolves
      .toBeInstanceOf(Array)
  })

  test('get rule', async () => {
    await expect(project.rule.findById(process.env.TEST_RULE_UUID!))
      .resolves
      .toHaveProperty('uuid', process.env.TEST_RULE_UUID!)
  })

  test('get edge rules', async () => {
    await expect(project.rule.findAll({
      mode: 'edge',
      enabled: true
    }))
      .resolves
      .toBeInstanceOf(Array)
  })

  test('test update rule', async () => {
    const rule = await project.rule.findAll()
    await expect(project.rule.updateById(rule[0].uuid, rule[0]))
      .resolves
  })
})
