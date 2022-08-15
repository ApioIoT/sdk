class Resource {
  constructor ({ client, basePath, name }) {
    this.basePath = basePath
    this.client = client
    this.name = name
  }

  find (query, options = {}) {
    return this.client.Get({ path: this.basePath, query, options })
  }

  findById (uuid, options = {}) {
    this.client.Get({ path: `${this.basePath}/${uuid}`, options })
  }

  create (data, options = {}) {
    this.client.Post({ path: this.basePath, data, options })
  }

  updateById (uuid, update, options = {}) {
    this.client.Put({ path: `${this.basePath}/${uuid}`, update, options })
  }

  deleteById (uuid, options = {}) {
    this.client.Delete({ path: `${this.basePath}/${uuid}`, options })
  }
}

module.exports = { Resource }
