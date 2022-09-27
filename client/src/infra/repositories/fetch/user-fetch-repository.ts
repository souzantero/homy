import {
  ConfirmUserEmailRepository,
  User,
  RawUser,
  RefreshUserEmailConfirmationCodeRepository
} from '../../../domain'

export class UserFetchRepository
  implements
    ConfirmUserEmailRepository,
    RefreshUserEmailConfirmationCodeRepository
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
      `${this.hostAddress}/users/refresh-email-confirmation-code`,
      {
        method: 'PATCH',
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
}
