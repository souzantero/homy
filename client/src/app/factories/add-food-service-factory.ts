import env from '../config/env'
import { AddFoodService } from "../../domain/services/add-food-service"
import { FoodFetchRepository } from "../../infra/repositories/fetch/food-fetch-repository"
import { User } from '../../domain/models/user'

export const makeAddFoodService = (signedUser: User) => {
  const foodRepository = new FoodFetchRepository(env.serverHostAddress, signedUser.authorizationToken)
  return new AddFoodService(foodRepository)
}