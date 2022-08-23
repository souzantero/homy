export class FoodNotFoundError extends Error {
  constructor(foodId: string) {
    super(`food id ${foodId} not found`)
    this.name = 'FoodNotFound'
  }
}
