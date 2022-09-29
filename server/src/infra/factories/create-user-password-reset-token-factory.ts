import { PrismaClient } from '@prisma/client'
import { CreateUserPasswordResetToken } from '../../domain/usecases/create-user-password-reset-token'
import { JwtAdapter } from '../adapters/jwt-adapter'
import { makeLoadUser } from './load-user-factory'
import { makeUpdateUserById } from './update-user-by-id-factory'

export const makeCreateUserPasswordResetToken = (
  prisma: PrismaClient,
  jwtSecret: string
) => {
  const jwt = new JwtAdapter(jwtSecret)
  const loadUser = makeLoadUser(prisma)
  const updateUserById = makeUpdateUserById(prisma)
  return new CreateUserPasswordResetToken(jwt, loadUser, updateUserById)
}
