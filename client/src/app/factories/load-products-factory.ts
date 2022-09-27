import { LoadProducts } from '@retaily/client/domain'
import { ProductFetchRepository } from '@retaily/client/infra'
import env from '../config/env'

export const makeLoadProducts = () => {
  const productRepository = new ProductFetchRepository(env.serverHostAddress)
  return new LoadProducts(productRepository)
}
