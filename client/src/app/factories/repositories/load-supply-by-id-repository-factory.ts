import { SupplyFetchRepository } from '../../../infra'
import env from '../../config/env'

export const makeLoadSupplyByIdRepository = () => {
  return new SupplyFetchRepository(env.serverHostAddress)
}
