import { PrismaClient } from '@prisma/client'
import { SignOutWithUser } from '../../../domain/usecases/sign-out-with-user'
import { makeUpdateUserById } from '../../user/factories/update-user-by-id-factory'

export const makeSignOutWithUser = (prisma: PrismaClient) => {
  const updateUserById = makeUpdateUserById(prisma)
  return new SignOutWithUser(updateUserById)
}
