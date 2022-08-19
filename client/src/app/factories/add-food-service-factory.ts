import env from '../config/env'
import { AddFoodService } from "../../domain/services/add-food-service"
import { FoodFetchRepository } from "../../infra/repositories/fetch/food-fetch-repository"

export const makeAddFoodService = (serverAuthorizationToken: string) => {
  const foodRepository = new FoodFetchRepository(env.serverHostAddress, serverAuthorizationToken)
  return new AddFoodService(foodRepository)
}