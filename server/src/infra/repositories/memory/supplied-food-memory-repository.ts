import { LoadSuppliedFoodsRepository } from '../../../domain/repositories/load-supplied-foods-repository'
import { SuppliedFood } from '../../../domain/models/supplied-food'

export class SuppliedFoodMemoryRepository
  implements LoadSuppliedFoodsRepository
{
  constructor(private readonly suppliedFoods: SuppliedFood[] = []) {}

  async loadManyByFoodSupplyId(
    foodSupplyId: string
  ): Promise<LoadSuppliedFoodsRepository.Result> {
    return this.suppliedFoods.filter(
      (suppliedFood) => suppliedFood.foodSupplyId === foodSupplyId
    )
  }
}
