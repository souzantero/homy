import { User } from '../models/user'

export interface SignInRepository {
  signIn(params: SignInRepository.Params): Promise<SignInRepository.Result>
}
export namespace SignInRepository {
  export type Params = {
    email: string
    password: string
  }

  export type Result = User
}
