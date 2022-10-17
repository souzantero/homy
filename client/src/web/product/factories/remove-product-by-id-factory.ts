import { ProductFetchRepository } from '../../../infra'
import { User, RemoveProductById } from '../../../domain'
import env from '../../../app/config/env'

export const makeRemoveProductById = (signedUser: User) => {
  const productRepository = new ProductFetchRepository(
    env.serverHostAddress,
    signedUser.authorizationToken
  )
  return new RemoveProductById(productRepository)
}
