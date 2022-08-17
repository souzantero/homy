import { PrismaClient } from "@prisma/client"
import { SignInWithUser } from "../../domain/usecases/sign-in-with-user"
import { JwtAdapter } from "../adapters/jwt-adapter"
import { UserPrismaRepository } from "../repositories/prisma/user-prisma-repository"

export const makeSignInWithUser = (prisma: PrismaClient) => {
  const jwt = new JwtAdapter('my-secret')
  const userRepository = new UserPrismaRepository(prisma)
  return new SignInWithUser(jwt, userRepository)
}