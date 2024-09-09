import { BaseResponse } from '../types'
import Resource from './resource'

class BaseResource<T, K extends BaseResponse> extends Resource<T, K> {}

export default BaseResource
