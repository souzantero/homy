import { AddProduct, User } from '@retaily/client/domain'
import { ProductFetchRepository } from '@retaily/client/infra'
import env from '../config/env'

export const makeAddProduct = (signedUser: User) => {
  const productRepository = new ProductFetchRepository(
    env.serverHostAddress,
    signedUser.authorizationToken
  )
  return new AddProduct(productRepository)
}
