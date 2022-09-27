import { Product } from '../models/product'
import { LoadProductsRepository } from '../repositories/load-products-repository'

export class LoadProducts {
  constructor(private loadProductsRepository: LoadProductsRepository) {}

  load(): Promise<LoadProducts.Result> {
    const where: LoadProductsRepository.Where = {
      deletedAt: null
    }

    return this.loadProductsRepository.loadMany(where)
  }
}

export namespace LoadProducts {
  export type Result = Product[]
}
