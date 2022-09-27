import { RemoveProductByIdRepository } from '../repositories/remove-product-by-id-repository'

export class RemoveProductById {
  constructor(
    private readonly removeProductByIdRepository: RemoveProductByIdRepository
  ) {}

  remove(id: string): Promise<void> {
    return this.removeProductByIdRepository.removeById(id)
  }
}
