import env from '../config/env'
import { ProductFetchRepository } from '../../infra/repositories/fetch/product-fetch-repository'
import { LoadProducts } from '../../domain/services/load-products'

export const makeLoadProducts = () => {
  const productRepository = new ProductFetchRepository(env.serverHostAddress)
  return new LoadProducts(productRepository)
}
