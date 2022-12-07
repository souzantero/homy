import { PrismaClient } from '@prisma/client'
import { RemoveSupplyById } from '../../../domain/usecases/remove-supply-by-id'
import { makeUpdateSupplyById } from './update-supply-by-id-factory'

export const makeRemoveSupplyById = (prisma: PrismaClient) => {
  const updateSupplyById = makeUpdateSupplyById(prisma)
  return new RemoveSupplyById(updateSupplyById)
}
