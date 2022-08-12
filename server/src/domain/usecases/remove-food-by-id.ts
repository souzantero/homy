import { FoodNotFoundError } from "../errors/food-not-found-error";
import { UpdateFoodByIdRepository } from "../repositories/update-food-by-id-repository";
import { LoadFoodById } from "./load-food-by-id";

export class RemoveFoodById {
  constructor(
    private readonly loadFoodById: LoadFoodById,
    private readonly updateFoodByIdRepository: UpdateFoodByIdRepository
  ) { }

  async remove(id: string): Promise<void> {
    const food = await this.loadFoodById.load(id)
    if (!food) {
      throw new FoodNotFoundError(id)
    }

    const now = new Date()
    const data: UpdateFoodByIdRepository.Data = {
      updatedAt: now,
      deletedAt: now
    }

    await this.updateFoodByIdRepository.updateById(id, data)
  }
}