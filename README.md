# @apio/sdk

NodeJS SDK for Apio IoT Platform.

## Installation

```
npm i @apio/sdk
```

## Usage

```typescript
import Sdk, { Device } from '@apio/sdk'

const sdk = Sdk.create({
  uri: 'platform-uri',
  apiKey: 'your-api-key',
  projectId: 'your-project-id'
})

async function main () {
  try {
    const devices: Device[] = await sdk.getDevices()
    console.log(devices)
  } catch (e) {
    console.error(e)
  }
}

main()
```

### Cache
Sdk support LRU cache strategy. For enable it set cache property in configuration:

```typescript
const sdk = Sdk.create({
  uri: 'platform-uri',
  apiKey: 'your-api-key',
  projectId: 'your-project-id'
  cache: true   // For default configuration
})
```

or

```typescript
const sdk = Sdk.create({
  uri: 'platform-uri',
  apiKey: 'your-api-key',
  projectId: 'your-project-id'
  cache: {      // For custom configuration
    max: 1000,
    ttl: 1000 * 60 * 5
  }
})
```