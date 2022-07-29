import { Food } from "../models/food"

export interface AddFood {
  add(data: AddFood.Params): Promise<AddFood.Result>
}

export namespace AddFood {
  export type Params = {
    name: string
    expiresIn: number
  }

  export type Result = Food
}
