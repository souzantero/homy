import { PrismaClient } from '@prisma/client'
import { User } from '../../../domain/models/user'
import { LoadUserRepository } from '../../../domain/repositories/load-user-repository'
import { AddUserRepository } from '../../../domain/repositories/add-user-repository'
import { UpdateUserByIdRepository } from '../../../domain/repositories/update-user-by-id-repository'

export class UserPrismaRepository
  implements AddUserRepository, LoadUserRepository, UpdateUserByIdRepository
{
  constructor(private readonly prisma: PrismaClient) {}

  add(user: AddUserRepository.Params): Promise<User> {
    return this.prisma.user.create({
      data: user
    })
  }

  loadOne(where: LoadUserRepository.Where): Promise<User> {
    return this.prisma.user.findFirst({ where })
  }

  updateById(id: string, data: UpdateUserByIdRepository.Data): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data
    })
  }
}
