import { PrismaClient, User as UserPrisma } from '@prisma/client'
import { Role, User } from '../../../domain/models/user'
import { LoadUserRepository } from '../../../domain/repositories/load-user-repository'
import { AddUserRepository } from '../../../domain/repositories/add-user-repository'
import { UpdateUserByIdRepository } from '../../../domain/repositories/update-user-by-id-repository'

export class UserPrismaRepository
  implements AddUserRepository, LoadUserRepository, UpdateUserByIdRepository
{
  constructor(private readonly prisma: PrismaClient) {}

  private toModel(user: UserPrisma): User {
    return {
      ...user,
      role: user.role === 'ADMIN' ? Role.ADMIN : Role.USER
    }
  }

  async add(user: AddUserRepository.Params): Promise<User> {
    const createdUser = await this.prisma.user.create({
      data: user
    })

    return this.toModel(createdUser)
  }

  async loadOne(where: LoadUserRepository.Where): Promise<User> {
    const userFound = await this.prisma.user.findFirst({ where })
    if (!userFound) return null
    return this.toModel(userFound)
  }

  async updateById(
    id: string,
    data: UpdateUserByIdRepository.Data
  ): Promise<User> {
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data
    })

    return this.toModel(updatedUser)
  }
}
