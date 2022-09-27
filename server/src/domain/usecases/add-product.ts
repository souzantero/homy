import { Product } from '../models/product'
import { Identifier } from '../protocols/identifier'
import { AddProductRepository } from '../repositories/add-product-repository'

export class AddProduct {
  constructor(
    private readonly identifier: Identifier,
    private readonly addProductRepository: AddProductRepository
  ) { }

  async add(data: AddProduct.Params): Promise<AddProduct.Result> {
    const { name } = data
    const id = this.identifier.identify()
    const createdAt = new Date()

    return this.addProductRepository.add({ id, name, createdAt })
  }
}

export namespace AddProduct {
  export type Params = {
    name: string
  }

  export type Result = Product
}
