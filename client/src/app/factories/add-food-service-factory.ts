import env from '../config/env'
import { AddFoodService } from "../../domain/services/add-food-service"
import { FoodFetchRepository } from "../../infra/repositories/fetch/food-fetch-repository"

export const makeAddFoodService = () => {
  const foodRepository = new FoodFetchRepository(env.serverHostAddress)
  return new AddFoodService(foodRepository)
}