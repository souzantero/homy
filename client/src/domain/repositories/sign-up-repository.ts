import { User } from '../models/user'

export interface SignUpRepository {
  signUp(params: SignUpRepository.Params): Promise<SignUpRepository.Result>
}
export namespace SignUpRepository {
  export type Params = {
    name: string
    email: string
    password: string
  }

  export type Result = User
}
