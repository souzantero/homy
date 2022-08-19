import env from '../config/env'
import { FoodFetchRepository } from "../../infra/repositories/fetch/food-fetch-repository"
import { RemoveFoodByIdService } from '../../domain/services/remove-food-by-id-service'

export const makeRemoveFoodByIdService = () => {
  const foodRepository = new FoodFetchRepository(env.serverHostAddress)
  return new RemoveFoodByIdService(foodRepository)
}