import { Food } from "../models/food";

export interface FoodRepository {
  findAll(): Promise<Food[]>
}