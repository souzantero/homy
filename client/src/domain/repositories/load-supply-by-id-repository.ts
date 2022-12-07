import { Supply } from '../models/supply'

export interface LoadSupplyByIdRepository {
  loadOneById(supplyId: string): Promise<Supply>
}
