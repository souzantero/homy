import { PrismaClient } from '@prisma/client'
import { ResetUserPassword } from '../../domain/usecases/reset-user-password'
import { BcryptAdapter } from '../adapters/bcrypt-adapter'
import { makeUpdateUserById } from './update-user-by-id-factory'

export const makeResetUserPassword = (
  prisma: PrismaClient,
  bcryptSalt: number
) => {
  const hasher = new BcryptAdapter(bcryptSalt)
  const updateUserById = makeUpdateUserById(prisma)
  return new ResetUserPassword(hasher, updateUserById)
}
