import { Product } from '../models/product'

export interface AddProductRepository {
  add(product: AddProductRepository.Params): Promise<AddProductRepository.Result>
}

export namespace AddProductRepository {
  export type Params = {
    id: string
    name: string
    createdAt: Date
  }

  export type Result = Product
}
