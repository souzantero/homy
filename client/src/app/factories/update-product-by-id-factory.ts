import env from '../config/env'
import { ProductFetchRepository } from '../../infra/repositories/fetch/product-fetch-repository'
import { UpdateProductById } from '../../domain/services/update-product-by-id'
import { User } from '../../domain/models/user'

export const makeUpdateProductById = (signedUser: User) => {
  const productRepository = new ProductFetchRepository(
    env.serverHostAddress,
    signedUser.authorizationToken
  )
  return new UpdateProductById(productRepository)
}
