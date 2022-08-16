import { SignInWithUser } from "../../domain/usecases/sign-in-with-user"
import { JwtAdapter } from "../adapters/jwt-adapter"

export const makeSignInWithUser = () => {
  const jwt = new JwtAdapter('my-secret')
  return new SignInWithUser(jwt)
}