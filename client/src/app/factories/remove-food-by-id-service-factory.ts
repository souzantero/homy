import env from '../config/env'
import { FoodFetchRepository } from '../../infra/repositories/fetch/food-fetch-repository'
import { RemoveFoodByIdService } from '../../domain/services/remove-food-by-id-service'
import { User } from '../../domain/models/user'

export const makeRemoveFoodByIdService = (signedUser: User) => {
  const foodRepository = new FoodFetchRepository(
    env.serverHostAddress,
    signedUser.authorizationToken
  )
  return new RemoveFoodByIdService(foodRepository)
}
