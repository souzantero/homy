import { ProductFetchRepository } from '@retailer/client/infra'
import { User, RemoveProductById } from '@retailer/client/domain'
import env from '../config/env'

export const makeRemoveProductById = (signedUser: User) => {
  const productRepository = new ProductFetchRepository(
    env.serverHostAddress,
    signedUser.authorizationToken
  )
  return new RemoveProductById(productRepository)
}
