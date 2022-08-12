import { AddFoodRepository } from "./add-food-repository"
import { LoadFoodByIdRepository } from "./load-food-by-id-repository"
import { LoadFoodsRepository } from "./load-foods-repository"
import { RemoveFoodRepository } from "./remove-food-repository"
import { UpdateFoodRepository } from "./update-food-repository"

export interface FoodRepository extends AddFoodRepository, 
  UpdateFoodRepository,
  LoadFoodByIdRepository, 
  LoadFoodsRepository, 
  RemoveFoodRepository { }