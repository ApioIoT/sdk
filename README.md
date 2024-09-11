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
    const devices: Device[] = await sdk.device.findAll()
    console.log(devices)
  } catch (e) {
    console.error(e)
  }
}

main()
```

### Cache
Sdk support Cache strategy. For enable it set cache property in configuration:

```typescript
const sdk = Sdk.create({
  uri: 'platform-uri',
  apiKey: 'your-api-key',
  projectId: 'your-project-id'
  cache: true // For default configuration. Otherwise: { ttl: number }
})
```