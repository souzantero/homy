import { PrismaClient } from "@prisma/client"
import { AuthenticateUserByEmailAndPassword } from "../../domain/usecases/authenticate-user-by-email-and-password"
import { BcryptAdapter } from "../adapters/bcrypt-adapter"
import { UserPrismaRepository } from "../repositories/prisma/user-prisma-repository"

export const makeAuthenticateUserByEmailAndPassword = (prisma: PrismaClient, bcryptSalt: number) => {
  const bcrypt = new BcryptAdapter(bcryptSalt)
  const userRepository = new UserPrismaRepository(prisma)
  return new AuthenticateUserByEmailAndPassword(bcrypt, userRepository)
}