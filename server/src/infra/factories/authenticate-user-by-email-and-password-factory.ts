import { PrismaClient } from '@prisma/client'
import { AuthenticateUserByEmailAndPassword } from '../../domain/usecases/authenticate-user-by-email-and-password'
import { BcryptAdapter } from '../adapters/bcrypt-adapter'
import { makeLoadUser } from './load-user-factory'

export const makeAuthenticateUserByEmailAndPassword = (
  prisma: PrismaClient,
  bcryptSalt: number
) => {
  const bcrypt = new BcryptAdapter(bcryptSalt)
  const loadUser = makeLoadUser(prisma)
  return new AuthenticateUserByEmailAndPassword(bcrypt, loadUser)
}
