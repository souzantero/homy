import { Supply } from '../models/supply'

export interface LoadSuppliesRepository {
  loadAll(): Promise<LoadSuppliesRepository.Result>
  loadMany(
    where: LoadSuppliesRepository.Where
  ): Promise<LoadSuppliesRepository.Result>
}

export namespace LoadSuppliesRepository {
  export type Where = Partial<Supply>
  export type Result = Supply[]
}
