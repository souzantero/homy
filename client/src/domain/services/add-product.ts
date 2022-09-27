import { AddProductRepository } from '../repositories/add-product-repository'

export class AddProduct {
  constructor(private readonly addProductRepository: AddProductRepository) {}

  add(params: AddProduct.Params): Promise<AddProduct.Result> {
    return this.addProductRepository.add(params)
  }
}

export namespace AddProduct {
  export type Params = AddProductRepository.Params
  export type Result = AddProductRepository.Result
}
