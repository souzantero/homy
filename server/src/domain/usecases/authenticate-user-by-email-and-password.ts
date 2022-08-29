import { User } from '../models/user'
import { HashComparer } from '../protocols/hash-comparer'
import { LoadUser } from './load-user'

export class AuthenticateUserByEmailAndPassword {
  constructor(
    private readonly hashComparer: HashComparer,
    private readonly loadUser: LoadUser
  ) {}

  async authenticate({
    email,
    password
  }: AuthenticateUserByEmailAndPassword.Params): Promise<AuthenticateUserByEmailAndPassword.Result> {
    const user = await this.loadUser.loadOne({ email })
    if (!user) return null
    const isValid = await this.hashComparer.compare(password, user.password)
    if (!isValid) return null
    return user
  }
}

export namespace AuthenticateUserByEmailAndPassword {
  export type Params = {
    email: string
    password: string
  }

  export type Result = User
}
