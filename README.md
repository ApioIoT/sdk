## ApioIoT-Node

NodeJS sdk for Apio IoT Projects

### Installation

```
npm i @apio/iot
```

### Usage

```javascript
const { Client } = require('./index.js')

const c = new Client({
  projectId: 'my-project-id',
  apiKey: 'my-api-key'
})

async function main () {
  const devices = await c.devices.find()
  console.log(JSON.stringify(devices))
}

main()

```


