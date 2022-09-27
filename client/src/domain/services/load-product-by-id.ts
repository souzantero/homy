import { Product } from '../models/product'
import { LoadProductByIdRepository } from '../repositories/load-product-by-id-repository'

export class LoadProductById {
  constructor(
    private readonly loadProductByIdRepository: LoadProductByIdRepository
  ) {}

  load(id: string): Promise<Product> {
    return this.loadProductByIdRepository.loadOneById(id)
  }
}
