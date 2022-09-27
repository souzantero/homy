import { LoadProductById } from '@retaily/client/domain'
import { ProductFetchRepository } from '@retaily/client/infra'
import env from '../config/env'

export const makeLoadProductById = () => {
  const productRepository = new ProductFetchRepository(env.serverHostAddress)
  return new LoadProductById(productRepository)
}
