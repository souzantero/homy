export interface ResetUserPasswordRepository {
  resetUserPassword(password: string): Promise<void>
}
