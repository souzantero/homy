import { User } from '../../../domain/models/user'
import { AuthenticationRepository } from '../../../domain/repositories/authentication-repository'
import { SignInRepository } from '../../../domain/repositories/sign-in-repository'
import { SignUpRepository } from '../../../domain/repositories/sign-up-repository'

export class AuthenticationFetchRepository implements AuthenticationRepository {
  constructor(
    private readonly hostAddress: string,
    private readonly authorizationToken?: string
  ) {}

  async signOut(): Promise<void> {
    const response = await fetch(`${this.hostAddress}/auth/sign-out`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.authorizationToken}`
      }
    })

    if (!response.ok) {
      const body = await response.json()
      throw new Error(body.message)
    }
  }

  async signUp(params: SignUpRepository.Params): Promise<User> {
    const response = await fetch(`${this.hostAddress}/auth/sign-up`, {
      method: 'POST',
      body: JSON.stringify(params),
      headers: { 'Content-Type': 'application/json' }
    })

    return this.handleResponse(response)
  }

  async signIn(
    params: SignInRepository.Params
  ): Promise<SignInRepository.Result> {
    const response = await fetch(`${this.hostAddress}/auth/sign-in`, {
      method: 'POST',
      body: JSON.stringify(params),
      headers: { 'Content-Type': 'application/json' }
    })

    return this.handleResponse(response)
  }

  private async handleResponse(response: Response) {
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
