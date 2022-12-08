import { PrismaClient } from '@prisma/client'
import { UpdateUserById } from '../../../domain/usecases/update-user-by-id'
import { UserPrismaRepository } from '../../../infra/repositories/prisma/user-prisma-repository'

export const makeUpdateUserById = (prisma: PrismaClient) => {
  const userRepository = new UserPrismaRepository(prisma)
  return new UpdateUserById(userRepository)
}
