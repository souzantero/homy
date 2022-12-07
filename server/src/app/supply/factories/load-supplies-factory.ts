import { PrismaClient } from '@prisma/client'
import { LoadSupplies } from '../../../domain/usecases/load-supplies'
import { SupplyPrismaRepository } from '../../../infra/repositories/prisma/supply-prisma-repository'

export const makeLoadSupplies = (prisma: PrismaClient) => {
  const supplyRepository = new SupplyPrismaRepository(prisma)
  return new LoadSupplies(supplyRepository)
}
