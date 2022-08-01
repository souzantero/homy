import { AddFoodRepository } from "./add-food-repository";
import { LoadFoodsRepository } from "./load-foods-repository";
import { RemoveFoodRepository } from "./remove-food-repository";

export interface FoodRepository extends AddFoodRepository, LoadFoodsRepository, RemoveFoodRepository { }