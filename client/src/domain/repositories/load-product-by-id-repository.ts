import { Product } from '../models/product'

export interface LoadProductByIdRepository {
  loadOneById(productId: string): Promise<Product>
}
