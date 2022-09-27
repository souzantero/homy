import { Product } from '../models/product'

export interface LoadProductRepository {
  loadOne(
    where: LoadProductRepository.Where
  ): Promise<LoadProductRepository.Result>
}

export namespace LoadProductRepository {
  export type Where = Partial<Product>
  export type Result = Product | null
}
