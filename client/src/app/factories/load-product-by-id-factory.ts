import { LoadProductById } from '../../domain'
import { ProductFetchRepository } from '../../infra'
import env from '../config/env'

export const makeLoadProductById = () => {
  const productRepository = new ProductFetchRepository(env.serverHostAddress)
  return new LoadProductById(productRepository)
}
