import { Product } from '../models/product'

export interface LoadProductsRepository {
  loadAll(): Promise<Product[]>
}
