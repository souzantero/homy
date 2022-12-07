import { PrismaClient } from '@prisma/client'
import { LoadSupplyById } from '../../../domain/usecases/load-supply-by-id'
import { SupplyPrismaRepository } from '../../../infra/repositories/prisma/supply-prisma-repository'

export const makeLoadSupplyById = (prisma: PrismaClient) => {
  const supplyRepository = new SupplyPrismaRepository(prisma)
  return new LoadSupplyById(supplyRepository)
}
