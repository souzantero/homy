import { AuthenticationRepository } from "../../../domain/repositories/authentication-repository"
import { SignInRepository } from "../../../domain/repositories/sign-in-repository"

export class AuthenticationFetchRepository implements AuthenticationRepository {
  constructor(private readonly hostAddress: string) { }

  async signIn(params: SignInRepository.Params): Promise<SignInRepository.Result> {
    const response = await fetch(`${this.hostAddress}/auth/sign-in`, {
      method: 'POST',
      body: JSON.stringify(params),
      headers: { 'Content-Type': 'application/json' }
    })

    const body = await response.json()

    if (!response.ok) {
      throw new Error(body.message)
    }

    return {
      id: body.id,
      createdAt: new Date(body.createdAt),
      updatedAt: body.updatedAt && new Date(body.createdAt),
      name: body.name,
      email: body.email,
      authorizationToken: body.authorizationToken
    }
  }
}