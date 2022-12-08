import { PrismaClient } from '@prisma/client'
import { LoadUserById } from '../../../domain/usecases/load-user-by-id'
import { makeLoadUser } from './load-user-factory'

export const makeLoadUserById = (prisma: PrismaClient) => {
  const loadUser = makeLoadUser(prisma)
  return new LoadUserById(loadUser)
}
