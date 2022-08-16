import { User } from '../models/user'
import { Encrypter } from '../protocols/encrypter'

export class SignInWithUser {
  constructor(
    private readonly encrypter: Encrypter
  ) { }

  async sign(user: User): Promise<SignInWithUser.Result> {
    const accessToken = await this.encrypter.encrypt(user.id)
    return { accessToken }
  }
}

export namespace SignInWithUser {
  export type Result = {
    accessToken: string
  }
}