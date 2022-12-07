import { Supply } from '../models/supply'

export interface LoadSupplyRepository {
  loadOne(
    where: LoadSupplyRepository.Where
  ): Promise<LoadSupplyRepository.Result>
}

export namespace LoadSupplyRepository {
  export type Where = Partial<Supply>
  export type Result = Supply | null
}
