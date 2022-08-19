import { Food } from "../models/food"
import { LoadFoodsRepository } from "../repositories/load-foods-repository"

export class LoadFoodsService {
  constructor(
    private readonly loadFoodsRepository: LoadFoodsRepository
  ) { }

  load(): Promise<Food[]> {
    return this.loadFoodsRepository.loadAll()
  }
}