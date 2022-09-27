import { ProductFetchRepository } from '@retaily/client/infra'
import { User, RemoveProductById } from '@retaily/client/domain'
import env from '../config/env'

export const makeRemoveProductById = (signedUser: User) => {
  const productRepository = new ProductFetchRepository(
    env.serverHostAddress,
    signedUser.authorizationToken
  )
  return new RemoveProductById(productRepository)
}
