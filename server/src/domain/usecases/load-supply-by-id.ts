import { Supply } from '../models/supply'
import { LoadSupplyRepository } from '../repositories/load-supply-repository'

export class LoadSupplyById {
  constructor(private readonly loadSupplyRepository: LoadSupplyRepository) {}

  async load(id: string): Promise<LoadSupplyById.Result> {
    const where: LoadSupplyRepository.Where = {
      id,
      deletedAt: null
    }

    return this.loadSupplyRepository.loadOne(where)
  }
}

export namespace LoadSupplyById {
  export type Result = Supply | null
}
