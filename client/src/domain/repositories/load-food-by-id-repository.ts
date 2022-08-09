import { Food } from "../models/food";

export interface LoadFoodByIdRepository {
  loadOneById(foodId: string): Promise<Food>
}