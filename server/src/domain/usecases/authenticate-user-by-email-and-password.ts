import { User } from "../models/user"

export class AuthenticateUserByEmailAndPassword {
  async authenticate({
    email,
    password
  }: AuthenticateUserByEmailAndPassword.Params): Promise<AuthenticateUserByEmailAndPassword.Result> {
    if (email !== 'dev@homy.app') return null
    return {
      id: Date.now().toString(),
      createdAt: new Date(),
      name: 'Felipe Antero',
      email,
      password: 'fakepasswd'
    }
  }
}

export namespace AuthenticateUserByEmailAndPassword {
  export type Params = {
    email: string
    password: string
  }

  export type Result = User
}