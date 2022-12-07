import { SupplyFetchRepository } from '../../../infra'
import env from '../../config/env'

export const makeLoadSuppliesRepository = () => {
  return new SupplyFetchRepository(env.serverHostAddress)
}
