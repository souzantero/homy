import { PrismaClient } from '@prisma/client'
import { RefreshUserEmailConfirmationCode } from '../../../domain/usecases/refresh-user-email-confirmation-code'
import { makeLoadUser } from './load-user-factory'
import { makeCreateUserEmailConfirmationCode } from './create-user-email-confirmation-code-factory'

export const makeRefreshUserEmailConfirmationCode = (prisma: PrismaClient) => {
  const loadUser = makeLoadUser(prisma)
  const createUserEmailConfirmationCode =
    makeCreateUserEmailConfirmationCode(prisma)
  return new RefreshUserEmailConfirmationCode(
    loadUser,
    createUserEmailConfirmationCode
  )
}
