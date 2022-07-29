import { Food } from "../models/food";

export interface FoodRepository {
  loadAll(): Promise<Food[]>
}