export interface RefreshUserEmailConfirmationCodeRepository {
  refreshUserEmailConfirmationCode(email: string): Promise<void>
}
