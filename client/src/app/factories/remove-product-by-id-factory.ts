import env from '../config/env'
import { ProductFetchRepository } from '../../infra/repositories/fetch/product-fetch-repository'
import { RemoveProductById } from '../../domain/services/remove-product-by-id'
import { User } from '../../domain/models/user'

export const makeRemoveProductById = (signedUser: User) => {
  const productRepository = new ProductFetchRepository(
    env.serverHostAddress,
    signedUser.authorizationToken
  )
  return new RemoveProductById(productRepository)
}
