import { SupplyFetchRepository } from '../../../infra'
import env from '../../config/env'

export const makeUpdateSupplyByIdRepository = (authorizationToken: string) => {
  return new SupplyFetchRepository(env.serverHostAddress, authorizationToken)
}
