import { LoadProducts } from '../../../domain'
import { ProductFetchRepository } from '../../../infra'
import env from '../../config/env'

export const makeLoadProducts = () => {
  const productRepository = new ProductFetchRepository(env.serverHostAddress)
  return new LoadProducts(productRepository)
}
