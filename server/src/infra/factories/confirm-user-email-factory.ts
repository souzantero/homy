import { PrismaClient } from '@prisma/client'
import { ConfirmUserEmail } from '../../domain/usecases/confirm-user-email'
import { makeLoadUser } from './load-user-factory'
import { makeUpdateUserById } from './update-user-by-id-factory'

export const makeConfirmUserEmail = (prisma: PrismaClient) => {
  const loadUser = makeLoadUser(prisma)
  const updateUserById = makeUpdateUserById(prisma)
  return new ConfirmUserEmail(loadUser, updateUserById)
}
