import { Food } from "../models/food";

export interface FoodRepository {
  find(): Promise<Food[]>
}