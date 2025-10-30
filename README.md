# @apio/sdk

NodeJS SDK for Apio IoT Platform.

## Installation

```bash
npm i @apio/sdk
```

## Usage

```typescript
import Sdk, { Device } from '@apio/sdk'

const sdk = new Sdk({
  uri: 'platform-uri',
  apiKey: 'your-api-key'
})

const project = sdk.project('your-project-id')
const devices: Device[] = await project.device.findAll()
```
