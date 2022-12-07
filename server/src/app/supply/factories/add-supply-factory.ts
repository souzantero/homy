import { PrismaClient } from '@prisma/client'
import { AddSupply } from '../../../domain/usecases/add-supply'
import { SupplyPrismaRepository } from '../../../infra/repositories/prisma/supply-prisma-repository'
import { UuidAdapter } from '../../../infra/adapters/uuid-adapter'

export const makeAddSupply = (prisma: PrismaClient) => {
  const uuidAdapter = new UuidAdapter()
  const supplyRepository = new SupplyPrismaRepository(prisma)
  return new AddSupply(uuidAdapter, supplyRepository)
}
