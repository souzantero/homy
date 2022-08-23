import { PrismaClient } from '@prisma/client'
import { LoadSuppliedFoodsRepository } from '../../../domain/repositories/load-supplied-foods-repository'

export class SuppliedFoodPrismaRepository
  implements LoadSuppliedFoodsRepository
{
  constructor(private readonly prisma: PrismaClient) {}

  loadManyByFoodSupplyId(
    foodSupplyId: string
  ): Promise<LoadSuppliedFoodsRepository.Result> {
    return this.prisma.suppliedFood.findMany({
      where: {
        foodSupplyId
      },
      include: {
        food: true
      }
    })
  }
}
