import { PrismaClient } from '@prisma/client'
import { UpdateSupplyById } from '../../../domain/usecases/update-supply-by-id'
import { SupplyPrismaRepository } from '../../../infra/repositories/prisma/supply-prisma-repository'
import { makeLoadSupplyById } from './load-supply-by-id-factory'

export const makeUpdateSupplyById = (prisma: PrismaClient) => {
  const loadSupplyById = makeLoadSupplyById(prisma)
  const supplyRepository = new SupplyPrismaRepository(prisma)

  return new UpdateSupplyById(loadSupplyById, supplyRepository)
}
