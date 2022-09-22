import { User } from '../models/user'

export interface SignMeRepository {
  signMe(): Promise<SignMeRepository.Result>
}
export namespace SignMeRepository {
  export type Result = User
}
