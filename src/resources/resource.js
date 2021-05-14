class Resource {
  constructor ({ client, basePath, name }) {
    this.basePath = basePath
    this.client = client
    this.name = name
  }

  find (query, options = {}) {
    return this.client.Get(this.basePath, query, options)
  }

  findById (uuid, options = {}) {
    this.client.Get(`${this.basePath}/${uuid}`, {}, options)
  }

  create (data, options = {}) {
    this.client.Post(this.basePath, data, options)
  }

  updateById (uuid, update, options = {}) {
    this.client.Put(`${this.basePath}/${uuid}`, update, options)
  }

  deleteById (uuid, options = {}) {
    this.client.Delete(`${this.basePath}/${uuid}`, options)
  }
}

module.exports = { Resource }
