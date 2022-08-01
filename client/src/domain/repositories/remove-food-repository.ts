import { Food } from "../models/food";

export interface RemoveFoodRepository {
  remove(food: Food): Promise<void>
}