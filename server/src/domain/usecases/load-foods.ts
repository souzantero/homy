import { Food } from "../models/food";
import { LoadFoodsRepository } from "../repositories/load-foods-repository";

export class LoadFoods {
  constructor(
    private foodRepository: LoadFoodsRepository
  ) { }

  load(): Promise<LoadFoods.Result> {
    return this.foodRepository.loadAll()
  }
}

export namespace LoadFoods {
  export type Result = Food[]
}