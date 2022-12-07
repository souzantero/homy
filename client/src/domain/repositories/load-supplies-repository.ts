import { Supply } from '../models/supply'

export interface LoadSuppliesRepository {
  loadAll(): Promise<Supply[]>
}
