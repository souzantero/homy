import { Module } from '@nestjs/common';
import { AddFoodSupply } from '../../domain/usecases/add-food-supply';
import { AddFood } from '../../domain/usecases/add-food';
import { LoadFoods } from '../../domain/usecases/load-foods';
import { UuidAdapter } from '../../infra/adapters/uuid-adapter';
import { FoodPrismaRepository } from '../../infra/repositories/prisma/food-prisma-repository';
import { FoodSupplyPrismaRepository } from '../../infra/repositories/prisma/food-supply-prisma-repository';
import { PrismaModule } from '../shared/prisma/prisma.module';
import { PrismaService } from '../shared/prisma/prisma.service';
import { FoodController } from './food.controller';

@Module({
  imports: [PrismaModule],
  controllers: [FoodController],
  providers: [
    {
      provide: FoodPrismaRepository,
      inject: [PrismaService],
      useFactory: (prismaService: PrismaService) => new FoodPrismaRepository(prismaService)
    },
    {
      provide: FoodSupplyPrismaRepository,
      inject: [PrismaService],
      useFactory: (prismaService: PrismaService) => new FoodSupplyPrismaRepository(prismaService)
    },
    {
      provide: LoadFoods,
      inject: [FoodPrismaRepository],
      useFactory: (foodPrismaRepository: FoodPrismaRepository) => new LoadFoods(foodPrismaRepository)
    },
    {
      provide: AddFood,
      inject: [FoodPrismaRepository],
      useFactory: (foodPrismaRepository: FoodPrismaRepository) => new AddFood(new UuidAdapter(), foodPrismaRepository)
    },
    {
      provide: AddFoodSupply,
      inject: [FoodSupplyPrismaRepository],
      useFactory: (foodSupplyPrismaRepository: FoodSupplyPrismaRepository) => new AddFoodSupply(new UuidAdapter(), foodSupplyPrismaRepository)
    }
  ]
})
export class FoodModule { }
