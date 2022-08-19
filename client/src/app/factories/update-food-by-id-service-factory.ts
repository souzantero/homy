import env from '../config/env'
import { FoodFetchRepository } from "../../infra/repositories/fetch/food-fetch-repository"
import { UpdateFoodByIdService } from '../../domain/services/update-food-by-id-service'

export const makeUpdateFoodByIdService = () => {
  const foodRepository = new FoodFetchRepository(env.serverHostAddress)
  return new UpdateFoodByIdService(foodRepository)
}