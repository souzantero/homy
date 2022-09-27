import env from '../config/env'
import { AddProduct } from '../../domain/services/add-product'
import { ProductFetchRepository } from '../../infra/repositories/fetch/product-fetch-repository'
import { User } from '../../domain/models/user'

export const makeAddProduct = (signedUser: User) => {
  const productRepository = new ProductFetchRepository(
    env.serverHostAddress,
    signedUser.authorizationToken
  )
  return new AddProduct(productRepository)
}
