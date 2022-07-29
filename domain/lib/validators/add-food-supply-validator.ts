import { AddFoodSupply } from "../usecases/add-food-supply"

export interface AddFoodSupplyValidator {
  validate(addFoodSupplyParams: AddFoodSupply.Params): Promise<void>
}