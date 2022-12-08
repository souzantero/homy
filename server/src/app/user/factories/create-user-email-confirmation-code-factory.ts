import { PrismaClient } from '@prisma/client'
import { CreateUserEmailConfirmationCode } from '../../../domain/usecases/create-user-email-confirmation-code'
import { makeUpdateUserById } from './update-user-by-id-factory'

export const makeCreateUserEmailConfirmationCode = (prisma: PrismaClient) => {
  const updateUserById = makeUpdateUserById(prisma)
  return new CreateUserEmailConfirmationCode(updateUserById)
}
