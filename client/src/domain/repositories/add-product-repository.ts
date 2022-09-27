import { Product } from '../models/product'

export interface AddProductRepository {
  add(params: AddProductRepository.Params): Promise<AddProductRepository.Result>
}
export namespace AddProductRepository {
  export type Params = {
    name: string
  }

  export type Result = Product
}
