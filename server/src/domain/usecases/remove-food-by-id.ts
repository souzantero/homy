import { UpdateFoodById } from './update-food-by-id'

export class RemoveFoodById {
  constructor(private readonly updateFoodById: UpdateFoodById) {}

  async remove(id: string): Promise<void> {
    const data = {
      deletedAt: new Date()
    }

    await this.updateFoodById.updateById(id, data)
  }
}
