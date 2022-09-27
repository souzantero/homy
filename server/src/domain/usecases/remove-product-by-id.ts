import { UpdateProductById } from './update-product-by-id'

export class RemoveProductById {
  constructor(private readonly updateProductById: UpdateProductById) {}

  async remove(id: string): Promise<void> {
    const data = {
      deletedAt: new Date()
    }

    await this.updateProductById.updateById(id, data)
  }
}
