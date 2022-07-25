import { FoodModel } from "./models/food";

export interface FoodRepository {
  loadAll(): Promise<FoodModel[]>
}