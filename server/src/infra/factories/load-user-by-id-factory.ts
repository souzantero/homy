import { PrismaClient } from "@prisma/client"
import { LoadUserById } from "../../domain/usecases/load-user-by-id"
import { UserPrismaRepository } from "../repositories/prisma/user-prisma-repository"

export const makeLoadUserById = (prisma: PrismaClient) => {
  const userRepository = new UserPrismaRepository(prisma)
  return new LoadUserById(userRepository)
}