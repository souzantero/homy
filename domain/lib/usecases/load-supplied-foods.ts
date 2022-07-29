import { SuppliedFood } from "../models/supplied-food"

export interface LoadSuppliedFoods {
  load(filter: LoadSuppliedFoods.Params): Promise<LoadSuppliedFoods.Result>
}

export namespace LoadSuppliedFoods {
  export type Params = {
    foodSupplyId: string
  }

  export type Result = SuppliedFood[]
}