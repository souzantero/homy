import { UpdateProductByIdRepository } from '../repositories/update-product-by-id-repository'

export class UpdateProductById {
  constructor(
    private readonly updateProductByIdRepository: UpdateProductByIdRepository
  ) {}

  update(
    id: string,
    data: UpdateProductById.Data
  ): Promise<UpdateProductById.Result> {
    return this.updateProductByIdRepository.updateById(id, data)
  }
}

export namespace UpdateProductById {
  export type Data = UpdateProductByIdRepository.Data
  export type Result = UpdateProductByIdRepository.Result
}
