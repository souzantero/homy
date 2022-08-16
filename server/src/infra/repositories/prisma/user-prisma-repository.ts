import { PrismaClient } from "@prisma/client"
import { User } from "src/domain/models/user"
import { AddUserRepository } from "../../../domain/repositories/add-user-repository"

export class UserPrismaRepository implements AddUserRepository {
  constructor(
    private readonly prisma: PrismaClient
  ) { }

  add(user: AddUserRepository.Params): Promise<User> {
    return this.prisma.user.create({
      data: user
    })
  }
}