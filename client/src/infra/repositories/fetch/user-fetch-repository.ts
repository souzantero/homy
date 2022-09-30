import {
  ConfirmUserEmailRepository,
  User,
  RawUser,
  RefreshUserEmailConfirmationCodeRepository,
  ForgetUserPasswordRepository
} from '../../../domain'
import { ResetUserPasswordRepository } from '../../../domain/repositories/reset-user-password-repository'

export class UserFetchRepository
  implements
    ConfirmUserEmailRepository,
    RefreshUserEmailConfirmationCodeRepository,
    ForgetUserPasswordRepository,
    ResetUserPasswordRepository
{
  constructor(
    private readonly hostAddress: string,
    private readonly authorizationToken?: string
  ) {}

  async confirmUserEmail(
    params: ConfirmUserEmailRepository.Params
  ): Promise<User> {
    const response = await fetch(`${this.hostAddress}/users/confirm-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    })

    const body = await response.json()

    if (!response.ok) {
      throw new Error(body.message)
    }

    return new RawUser(body)
  }

  async refreshUserEmailConfirmationCode(email: string): Promise<void> {
    const response = await fetch(
      `${this.hostAddress}/users/email-confirmation-code`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      }
    )

    if (!response.ok) {
      const body = await response.json()
      throw new Error(body.message)
    }
  }

  async forgetUserPassword(email: string): Promise<void> {
    const response = await fetch(`${this.hostAddress}/users/forget-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    })

    if (!response.ok) {
      const body = await response.json()
      throw new Error(body.message)
    }
  }

  async resetUserPassword(password: string): Promise<void> {
    const response = await fetch(`${this.hostAddress}/users/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.authorizationToken}`
      },
      body: JSON.stringify({ password })
    })

    if (!response.ok) {
      const body = await response.json()
      throw new Error(body.message)
    }
  }
}
