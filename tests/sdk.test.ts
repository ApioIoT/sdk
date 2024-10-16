import 'dotenv/config'

import Sdk from '../src/sdk/sdk'

import { AuthenticationError, ConfigurationError, NotFoundError, AbortError } from '../src/types'

const sdk = Sdk.create({
  uri: process.env.BASE_URI!,
  apiKey: process.env.API_KEY!,
  projectId: process.env.PROJECT_ID!
})

describe('Testing SDK', () => {
  test('test ConfigurationError', async () => {
    const sdk = Sdk.create({
      uri: 'asd',
      apiKey: process.env.API_KEY!,
      projectId: process.env.PROJECT_ID!
    })

    await expect(sdk.node.findAll())
      .rejects
      .toThrow(ConfigurationError)
  })

  test('test AuthenticationError', async () => {
    const sdk = Sdk.create({
      uri: process.env.BASE_URI!,
      apiKey: 'lol',
      projectId: process.env.PROJECT_ID!
    })

    await expect(sdk.node.findAll())
      .rejects
      .toThrow(AuthenticationError)
  })

  test('get project', async () => {
    await expect(sdk.project())
      .resolves
      .toHaveProperty('uuid', process.env.PROJECT_ID!)
  })

  test('get nodes', async () => {
    await expect(sdk.node.findAll())
      .resolves
      .toBeInstanceOf(Array)
  })

  test('get node', async () => {
    await expect(sdk.node.findById(process.env.TEST_NODE_UUID!))
      .resolves
      .toHaveProperty('uuid', process.env.TEST_NODE_UUID!)
  })

  test('get fake node', async () => {
    await expect(sdk.node.findById('123'))
      .rejects
      .toThrow(NotFoundError)
  })

  test('get devices', async () => {
    await expect(sdk.device.findAll())
      .resolves
      .toBeInstanceOf(Array)
  })

  test('get device', async () => {
    await expect(sdk.device.findById(process.env.TEST_DEVICE_UUID!))
      .resolves
      .toHaveProperty('uuid', process.env.TEST_DEVICE_UUID!)
  })

  test('get fake device', async () => {
    await expect(sdk.device.findById('123'))
      .rejects
      .toThrow(NotFoundError)
  })

  test('get device types', async () => {
    await expect(sdk.deviceType.findAll())
      .resolves
      .toBeInstanceOf(Array)
  })

  test('get device type', async () => {
    await expect(sdk.deviceType.findById(process.env.TEST_DEVICE_TYPE_UUID!))
      .resolves
      .toHaveProperty('uuid', process.env.TEST_DEVICE_TYPE_UUID!)
  })

  test('get fake device type', async () => {
    await expect(sdk.deviceType.findById('123'))
      .rejects
      .toThrow(NotFoundError)
  })

  test('test Timeout', async () => {
    const sdk = Sdk.create({
      uri: process.env.BASE_URI!,
      apiKey: 'lol',
      projectId: process.env.PROJECT_ID!,
      timeout: 1
    })

    await expect(sdk.node.findAll())
      .rejects
      .toThrow(AbortError)
  })

  test('test Cancellation with timeout', async () => {
    const sdk = Sdk.create({
      uri: process.env.BASE_URI!,
      apiKey: 'lol',
      projectId: process.env.PROJECT_ID!,
      signal: AbortSignal.timeout(1)
    })

    await expect(sdk.node.findAll())
      .rejects
      .toThrow(AbortError)
  })

  test('test Cancellation with abort', async () => {
    const controller = new AbortController()
    
    const sdk = Sdk.create({
      uri: process.env.BASE_URI!,
      apiKey: 'lol',
      projectId: process.env.PROJECT_ID!,
      signal: controller.signal
    })

    controller.abort()

    await expect(sdk.node.findAll())
      .rejects
      .toThrow(AbortError)
  })
})
