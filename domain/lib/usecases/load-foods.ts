import { Food } from "../models/food"

export interface LoadFoods {
  load(): Promise<LoadFoods.Result>
}

export namespace LoadFoods {
  export type Result = Food[]
}