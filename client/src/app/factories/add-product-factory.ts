import { AddProduct, User } from '../../domain'
import { ProductFetchRepository } from '../../infra'
import env from '../config/env'

export const makeAddProduct = (signedUser: User) => {
  const productRepository = new ProductFetchRepository(
    env.serverHostAddress,
    signedUser.authorizationToken
  )
  return new AddProduct(productRepository)
}
