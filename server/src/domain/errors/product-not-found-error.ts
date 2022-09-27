export class ProductNotFoundError extends Error {
  constructor() {
    super('product not found')
    this.name = 'ProductNotFound'
  }
}
