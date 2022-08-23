import { PrismaClient } from '@prisma/client'
import { SignInWithUser } from '../../domain/usecases/sign-in-with-user'
import { JwtAdapter } from '../adapters/jwt-adapter'
import { UserPrismaRepository } from '../repositories/prisma/user-prisma-repository'

export const makeSignInWithUser = (prisma: PrismaClient, jwtSecret: string) => {
  const jwt = new JwtAdapter(jwtSecret)
  const userRepository = new UserPrismaRepository(prisma)
  return new SignInWithUser(jwt, userRepository)
}
