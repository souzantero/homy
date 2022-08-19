import { RemoveFoodRepository } from "../repositories/remove-food-repository"

export class RemoveFoodByIdService {
  constructor(
    private readonly removeFoodRepository: RemoveFoodRepository
  ) { }

  remove(id: string): Promise<void> {
    return this.removeFoodRepository.removeById(id)
  }
}