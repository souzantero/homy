import { Supply } from '../models/supply'
import { LoadSuppliesRepository } from '../repositories/load-supplies-repository'

export class LoadSupplies {
  constructor(private loadSuppliesRepository: LoadSuppliesRepository) {}

  load(): Promise<LoadSupplies.Result> {
    const where: LoadSuppliesRepository.Where = {
      deletedAt: null
    }

    return this.loadSuppliesRepository.loadMany(where)
  }
}

export namespace LoadSupplies {
  export type Result = Supply[]
}
