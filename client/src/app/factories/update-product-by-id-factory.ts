import { ProductFetchRepository } from '../../infra'
import { UpdateProductById, User } from '../../domain'
import env from '../config/env'

export const makeUpdateProductById = (signedUser: User) => {
  const productRepository = new ProductFetchRepository(
    env.serverHostAddress,
    signedUser.authorizationToken
  )
  return new UpdateProductById(productRepository)
}
