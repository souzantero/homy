import { User } from '../models/user'

export class SignInWithUser {
  async sign(user: User): Promise<SignInWithUser.Result> {
    return {
      accessToken: JSON.stringify(user)
    }
  }
}

export namespace SignInWithUser {
  export type Result = {
    accessToken: string
  }
}