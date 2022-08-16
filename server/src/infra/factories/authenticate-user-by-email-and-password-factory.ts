import { PrismaClient } from "@prisma/client"
import { AuthenticateUserByEmailAndPassword } from "../../domain/usecases/authenticate-user-by-email-and-password"
import { BcryptAdapter } from "../adapters/bcrypt-adapter"
import { UserPrismaRepository } from "../repositories/prisma/user-prisma-repository"

export const makeAuthenticateUserByEmailAndPassword = (prisma: PrismaClient) => {
  const bcrypt = new BcryptAdapter(12)
  const userRepository = new UserPrismaRepository(prisma)
  return new AuthenticateUserByEmailAndPassword(bcrypt, userRepository)
}