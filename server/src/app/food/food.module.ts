import { Module } from '@nestjs/common';
import { AddFood } from '../../domain/usecases/add-food';
import { LoadFoods } from '../../domain/usecases/load-foods';
import { FoodPrismaRepository } from '../../infra/repositories/prisma/food-prisma-repository';
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
      provide: LoadFoods,
      inject: [FoodPrismaRepository],
      useFactory: (foodPrismaRepository: FoodPrismaRepository) => new LoadFoods(foodPrismaRepository)
    },
    {
      provide: AddFood,
      inject: [FoodPrismaRepository],
      useFactory: (foodPrismaRepository: FoodPrismaRepository) => new AddFood(foodPrismaRepository)
    }
  ]
})
export class FoodModule { }
