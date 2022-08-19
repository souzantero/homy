import env from '../config/env'
import { FoodFetchRepository } from "../../infra/repositories/fetch/food-fetch-repository"
import { UpdateFoodByIdService } from '../../domain/services/update-food-by-id-service'
import { User } from '../../domain/models/user'

export const makeUpdateFoodByIdService = (signedUser: User) => {
  const foodRepository = new FoodFetchRepository(env.serverHostAddress, signedUser.authorizationToken)
  return new UpdateFoodByIdService(foodRepository)
}