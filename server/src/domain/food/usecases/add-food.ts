import { FoodModel } from "../models/food";

export class AddFood {
  add(data: AddFood.Params): Promise<void> {
    throw new Error('Not Implemented Error')
  }
}

export namespace AddFood {
  export type Params = Omit<FoodModel, 'id'>
}
