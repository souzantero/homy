import { Module } from '@nestjs/common';
import { LoadFoods } from 'src/domain/food/usecases/load-foods';
import { PrismaModule } from '../shared/prisma/prisma.module';
import { FoodPrismaRepository } from './food-prisma.repository';
import { FoodController } from './food.controller';

@Module({
  imports: [PrismaModule],
  controllers: [FoodController],
  providers: [
    FoodPrismaRepository,
    {
      provide: LoadFoods,
      inject: [FoodPrismaRepository],
      useFactory: (foodPrismaRepository: FoodPrismaRepository) => new LoadFoods(foodPrismaRepository)
    }
  ]
})
export class FoodModule { }
