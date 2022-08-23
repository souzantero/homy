import { Food } from '../models/food'

export interface LoadFoodsRepository {
  loadAll(): Promise<Food[]>
}
