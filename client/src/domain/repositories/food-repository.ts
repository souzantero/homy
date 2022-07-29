import { AddFoodRepository } from "./add-food-repository";
import { LoadFoodsRepository } from "./load-foods-repository";

export interface FoodRepository extends AddFoodRepository, LoadFoodsRepository {}