import env from '../config/env'
import { FoodFetchRepository } from "../../infra/repositories/fetch/food-fetch-repository"
import { LoadFoodsService } from '../../domain/services/load-foods-service'

export const makeLoadFoodsService = () => {
  const foodRepository = new FoodFetchRepository(env.serverHostAddress)
  return new LoadFoodsService(foodRepository)
}