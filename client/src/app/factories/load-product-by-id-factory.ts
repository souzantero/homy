import { LoadProductById } from '@retailer/client/domain'
import { ProductFetchRepository } from '@retailer/client/infra'
import env from '../config/env'

export const makeLoadProductById = () => {
  const productRepository = new ProductFetchRepository(env.serverHostAddress)
  return new LoadProductById(productRepository)
}
