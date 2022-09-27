import env from '../config/env'
import { ProductFetchRepository } from '../../infra/repositories/fetch/product-fetch-repository'
import { LoadProductById } from '../../domain/services/load-product-by-id'

export const makeLoadProductById = () => {
  const productRepository = new ProductFetchRepository(env.serverHostAddress)
  return new LoadProductById(productRepository)
}
