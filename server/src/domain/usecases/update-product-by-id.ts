import { ProductNotFoundError } from '../errors/product-not-found-error'
import { Product } from '../models/product'
import { UpdateProductByIdRepository } from '../repositories/update-product-by-id-repository'
import { LoadProductById } from './load-product-by-id'

export class UpdateProductById {
  constructor(
    private readonly loadProductById: LoadProductById,
    private readonly updateProductByIdRepository: UpdateProductByIdRepository
  ) { }

  async updateById(
    id: string,
    data: UpdateProductById.Data
  ): Promise<UpdateProductById.Result> {
    const product = await this.loadProductById.load(id)
    if (!product) {
      throw new ProductNotFoundError()
    }

    return this.updateProductByIdRepository.updateById(id, {
      ...data,
      updatedAt: new Date()
    })
  }
}

export namespace UpdateProductById {
  export type Data = Omit<UpdateProductByIdRepository.Data, 'updatedAt'>
  export type Result = Product
}
