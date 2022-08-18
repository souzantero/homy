import { AuthenticationRepository } from "./authentication-repository"
import { FoodRepository } from "./food-repository"

export interface Repository {
  auth: AuthenticationRepository
  food: FoodRepository
}