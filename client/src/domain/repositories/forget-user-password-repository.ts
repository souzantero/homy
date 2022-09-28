export interface ForgetUserPasswordRepository {
  forgetUserPassword(email: string): Promise<void>
}
