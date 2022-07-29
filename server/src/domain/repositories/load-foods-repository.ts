import { Food } from "../models/food";

export interface LoadFoodsRepository {
  loadAll(): Promise<LoadFoodsRepository.Result>
}

export namespace LoadFoodsRepository {
  export type Result = Food[]
}