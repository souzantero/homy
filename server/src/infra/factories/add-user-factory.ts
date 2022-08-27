import { PrismaClient } from '@prisma/client'
import { AddUser } from '../../domain/usecases/add-user'
import { BcryptAdapter } from '../adapters/bcrypt-adapter'
import { UuidAdapter } from '../adapters/uuid-adapter'
import { UserPrismaRepository } from '../repositories/prisma/user-prisma-repository'
import { makeCreateUserEmailConfirmationCode } from './create-user-email-confirmation-code-factory'

export const makeAddUser = (prisma: PrismaClient, bcryptSalt: number) => {
  const identifier = new UuidAdapter()
  const hasher = new BcryptAdapter(bcryptSalt)
  const userRepository = new UserPrismaRepository(prisma)
  const addUser = new AddUser(
    identifier,
    hasher,
    userRepository,
    userRepository
  )
  const createUserEmailConfirmationCode =
    makeCreateUserEmailConfirmationCode(prisma)

  addUser.onAdded.push({
    async onAdded(user) {
      await createUserEmailConfirmationCode.create(user)
    }
  })

  return addUser
}
