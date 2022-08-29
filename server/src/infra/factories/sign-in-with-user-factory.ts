import { PrismaClient } from '@prisma/client'
import { SignInWithUser } from '../../domain/usecases/sign-in-with-user'
import { JwtAdapter } from '../adapters/jwt-adapter'
import { makeUpdateUserById } from './update-user-by-id-factory'

export const makeSignInWithUser = (prisma: PrismaClient, jwtSecret: string) => {
  const jwt = new JwtAdapter(jwtSecret)
  const updateUserById = makeUpdateUserById(prisma)
  return new SignInWithUser(jwt, updateUserById)
}
