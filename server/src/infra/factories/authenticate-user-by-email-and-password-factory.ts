import { AuthenticateUserByEmailAndPassword } from "../../domain/usecases/authenticate-user-by-email-and-password"

export const makeAuthenticateUserByEmailAndPassword = () => {
  return new AuthenticateUserByEmailAndPassword()
}