import { ConfirmUserEmailRepository } from '../../../domain/repositories/confirm-user-email-repository'

export class UserFetchRepository implements ConfirmUserEmailRepository {
  constructor(
    private readonly hostAddress: string,
    private readonly authorizationToken?: string
  ) {}

  async confirmUserEmail(
    params: ConfirmUserEmailRepository.Params
  ): Promise<void> {
    const response = await fetch(`${this.hostAddress}/users/confirm-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    })

    if (!response.ok) {
      const body = await response.json()
      throw new Error(body.message)
    }
  }
}
