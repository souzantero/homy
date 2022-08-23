import { SuppliedFood } from '../models/supplied-food'
import { LoadSuppliedFoodsRepository } from '../repositories/load-supplied-foods-repository'

export class LoadSuppliedFoods {
  constructor(
    private loadSuppliedFoodsRepository: LoadSuppliedFoodsRepository
  ) {}

  load(filter: LoadSuppliedFoods.Params): Promise<LoadSuppliedFoods.Result> {
    return this.loadSuppliedFoodsRepository.loadManyByFoodSupplyId(
      filter.foodSupplyId
    )
  }
}

export namespace LoadSuppliedFoods {
  export type Params = {
    foodSupplyId: string
  }

  export type Result = SuppliedFood[]
}
