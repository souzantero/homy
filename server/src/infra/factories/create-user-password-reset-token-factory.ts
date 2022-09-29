import { PrismaClient } from '@prisma/client'
import { ForgetUserPassword } from '../../domain/usecases/forget-user-password'
import { JwtAdapter } from '../adapters/jwt-adapter'
import { makeLoadUser } from './load-user-factory'
import { makeUpdateUserById } from './update-user-by-id-factory'

export const makeForgetUserPassword = (
  prisma: PrismaClient,
  jwtSecret: string
) => {
  const jwt = new JwtAdapter(jwtSecret)
  const loadUser = makeLoadUser(prisma)
  const updateUserById = makeUpdateUserById(prisma)
  return new ForgetUserPassword(jwt, loadUser, updateUserById)
}
