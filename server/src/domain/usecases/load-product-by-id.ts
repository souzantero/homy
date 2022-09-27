import { Product } from '../models/product'
import { LoadProductRepository } from '../repositories/load-product-repository'

export class LoadProductById {
  constructor(private readonly loadProductRepository: LoadProductRepository) { }

  async load(id: string): Promise<LoadProductById.Result> {
    const where: LoadProductRepository.Where = {
      id,
      deletedAt: null
    }

    return this.loadProductRepository.loadOne(where)
  }
}

export namespace LoadProductById {
  export type Result = Product | null
}
