import { User } from "../models/user"

export class AuthenticateUserByEmailAndPassword {
  async authenticate({
    email,
    password
  }: AuthenticateUserByEmailAndPassword.Params): Promise<AuthenticateUserByEmailAndPassword.Result> {
    if (email !== 'dev@homy.app') return null
    return { email }
  }
}

export namespace AuthenticateUserByEmailAndPassword {
  export type Params = {
    email: string
    password: string
  }

  export type Result = User
}