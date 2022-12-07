export class SupplyNotFoundError extends Error {
  constructor() {
    super('supply not found')
    this.name = 'SupplyNotFound'
  }
}
