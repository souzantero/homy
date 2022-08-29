import { PrismaClient } from '@prisma/client'
import { ConfirmUserEmail } from '../../domain/usecases/confirm-user-email'
import { makeLoadUserById } from './load-user-by-id-factory'
import { makeUpdateUserById } from './update-user-by-id-factory'

export const makeConfirmUserEmail = (prisma: PrismaClient) => {
  const loadUserById = makeLoadUserById(prisma)
  const updateUserById = makeUpdateUserById(prisma)
  return new ConfirmUserEmail(loadUserById, updateUserById)
}
