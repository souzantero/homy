import { UpdateFoodByIdRepository } from "../repositories/update-food-by-id-repository";

export class RemoveFoodById {
  constructor(
    private readonly updateFoodByIdRepository: UpdateFoodByIdRepository
  ) { }

  async remove(id: string): Promise<void> {
    const now = new Date()
    const data: UpdateFoodByIdRepository.Data = {
      updatedAt: now,
      deletedAt: now
    }

    await this.updateFoodByIdRepository.updateById(id, data)
  }
}