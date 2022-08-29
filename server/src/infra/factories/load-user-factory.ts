import { PrismaClient } from '@prisma/client'
import { LoadUser } from '../../domain/usecases/load-user'
import { UserPrismaRepository } from '../repositories/prisma/user-prisma-repository'

export const makeLoadUser = (prisma: PrismaClient) => {
  const userRepository = new UserPrismaRepository(prisma)
  return new LoadUser(userRepository)
}
