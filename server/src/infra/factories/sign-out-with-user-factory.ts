import { PrismaClient } from '@prisma/client'
import { SignOutWithUser } from '../../domain/usecases/sign-out-with-user'
import { UserPrismaRepository } from '../repositories/prisma/user-prisma-repository'

export const makeSignOutWithUser = (prisma: PrismaClient) => {
  const userRepository = new UserPrismaRepository(prisma)
  return new SignOutWithUser(userRepository)
}
