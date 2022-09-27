import { Product } from '../models/product'
import { LoadProductsRepository } from '../repositories/load-products-repository'

export class LoadProducts {
  constructor(
    private readonly loadProductsRepository: LoadProductsRepository
  ) {}

  load(): Promise<Product[]> {
    return this.loadProductsRepository.loadAll()
  }
}
