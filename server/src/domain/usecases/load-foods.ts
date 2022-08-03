import { Food } from "../models/food";
import { LoadFoodsRepository } from "../repositories/load-foods-repository";

export class LoadFoods {
  constructor(
    private loadFoodsRepository: LoadFoodsRepository
  ) { }

  load(): Promise<LoadFoods.Result> {
    const where: LoadFoodsRepository.Where = {
      deletedAt: null
    }

    return this.loadFoodsRepository.loadMany(where)
  }
}

export namespace LoadFoods {
  export type Result = Food[]
}