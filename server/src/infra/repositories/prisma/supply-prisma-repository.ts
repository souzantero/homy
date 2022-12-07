import { PrismaClient } from '@prisma/client'
import { Supply } from '../../../domain/models/supply'
import { AddSupplyRepository } from '../../../domain/repositories/add-supply-repository'
import { UpdateSupplyByIdRepository } from '../../../domain/repositories/update-supply-by-id-repository'
import { LoadSuppliesRepository } from '../../../domain/repositories/load-supplies-repository'
import { LoadSupplyRepository } from '../../../domain/repositories/load-supply-repository'

export class SupplyPrismaRepository
  implements
    AddSupplyRepository,
    UpdateSupplyByIdRepository,
    LoadSupplyRepository,
    LoadSuppliesRepository
{
  constructor(private readonly prisma: PrismaClient) {}

  loadOne(where: LoadSupplyRepository.Where): Promise<Supply> {
    return this.prisma.supply.findFirst({ where })
  }

  loadMany(
    where: LoadSuppliesRepository.Where
  ): Promise<LoadSuppliesRepository.Result> {
    return this.prisma.supply.findMany({ where })
  }

  updateById(
    id: string,
    data: UpdateSupplyByIdRepository.Data
  ): Promise<UpdateSupplyByIdRepository.Result> {
    return this.prisma.supply.update({
      where: { id },
      data
    })
  }

  add(supply: AddSupplyRepository.Params): Promise<Supply> {
    return this.prisma.supply.create({
      data: supply
    })
  }

  loadAll(): Promise<Supply[]> {
    return this.prisma.supply.findMany()
  }
}
