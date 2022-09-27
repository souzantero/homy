import { LoadProducts } from '@retailer/client/domain'
import { ProductFetchRepository } from '@retailer/client/infra'
import env from '../config/env'

export const makeLoadProducts = () => {
  const productRepository = new ProductFetchRepository(env.serverHostAddress)
  return new LoadProducts(productRepository)
}
