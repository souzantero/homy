import env from '../config/env'
import { FoodFetchRepository } from '../../infra/repositories/fetch/food-fetch-repository'
import { LoadFoodByIdService } from '../../domain/services/load-food-by-id-service'

export const makeLoadFoodByIdService = () => {
  const foodRepository = new FoodFetchRepository(env.serverHostAddress)
  return new LoadFoodByIdService(foodRepository)
}
