import { SupplyFetchRepository } from '../../../infra'
import env from '../../config/env'

export const makeAddSupplyRepository = (authorizationToken: string) => {
  return new SupplyFetchRepository(env.serverHostAddress, authorizationToken)
}
