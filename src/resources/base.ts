import Resource from './resource'

class BaseResource<T, K extends T> extends Resource<T, K> {}

export default BaseResource
