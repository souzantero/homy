import { AddProduct, User } from '@retailer/client/domain'
import { ProductFetchRepository } from '@retailer/client/infra'
import env from '../config/env'

export const makeAddProduct = (signedUser: User) => {
  const productRepository = new ProductFetchRepository(
    env.serverHostAddress,
    signedUser.authorizationToken
  )
  return new AddProduct(productRepository)
}
