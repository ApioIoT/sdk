import 'dotenv/config'

import Sdk from '../index'

import { AuthenticationError, ConfigurationError, NotFoundError } from '../index'

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

    await expect(sdk.getNodes())
      .rejects
      .toThrow(ConfigurationError)
  })

  test('test AuthenticationError', async () => {
    const sdk = Sdk.create({
      uri: process.env.BASE_URI!,
      apiKey: 'lol',
      projectId: process.env.PROJECT_ID!
    })

    await expect(sdk.getNodes())
      .rejects
      .toThrow(AuthenticationError)
  })

  test('get nodes', async () => {
    await expect(sdk.getNodes())
      .resolves
      .toBeInstanceOf(Array)
  })

  test('get node', async () => {
    await expect(sdk.getNode(process.env.TEST_NODE_UUID!))
      .resolves
      .toHaveProperty('uuid', process.env.TEST_NODE_UUID!)
  })

  test('get fake node', async () => {
    await expect(sdk.getNode('123'))
      .rejects
      .toThrow(NotFoundError)
  })

  test('get devices', async () => {
    await expect(sdk.getDevices())
      .resolves
      .toBeInstanceOf(Array)
  })
  
  test('get device', async () => {
    await expect(sdk.getDevice(process.env.TEST_DEVICE_UUID!))
      .resolves
      .toHaveProperty('uuid', process.env.TEST_DEVICE_UUID!)
  })

  test('get fake device', async () => {
    await expect(sdk.getDevice('123'))
      .rejects
      .toThrow(NotFoundError)
  })

  test('get device types', async () => {
    await expect(sdk.getDeviceTypes())
      .resolves
      .toBeInstanceOf(Array)
  })
 
  test('get device type', async () => {
    await expect(sdk.getDeviceType(process.env.TEST_DEVICE_TYPE_UUID!))
      .resolves
      .toHaveProperty('uuid', process.env.TEST_DEVICE_TYPE_UUID!)
  })

  test('get fake device type', async () => {
    await expect(sdk.getDeviceType('123'))
      .rejects
      .toThrow(NotFoundError)
  })
})
