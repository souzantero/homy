import { PrismaClient } from "@prisma/client"
import { AuthenticateUserByAuthorizationToken } from "../../domain/usecases/authenticate-user-by-authorization-token"
import { JwtAdapter } from "../adapters/jwt-adapter"
import { makeLoadUserById } from "./load-user-by-id-factory"

export const makeAuthenticateUserByAuthorizationToken = (prisma: PrismaClient, jwtSecret: string) => {
  const jwt = new JwtAdapter(jwtSecret)
  const loadUserById = makeLoadUserById(prisma)
  return new AuthenticateUserByAuthorizationToken(jwt, loadUserById)
}