import { Product } from '../models/product'

export interface UpdateProductByIdRepository {
  updateById(
    id: string,
    data: UpdateProductByIdRepository.Data
  ): Promise<UpdateProductByIdRepository.Result>
}
export namespace UpdateProductByIdRepository {
  export type Data = {
    name: string
  }

  export type Result = Product
}
