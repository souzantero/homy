import { Product } from '../models/product'

export interface LoadProductsRepository {
  loadAll(): Promise<LoadProductsRepository.Result>
  loadMany(
    where: LoadProductsRepository.Where
  ): Promise<LoadProductsRepository.Result>
}

export namespace LoadProductsRepository {
  export type Where = Partial<Product>
  export type Result = Product[]
}
