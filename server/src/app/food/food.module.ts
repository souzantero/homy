import { Module } from '@nestjs/common';
import { AddFoodSupply } from '../../domain/usecases/add-food-supply';
import { AddFood } from '../../domain/usecases/add-food';
import { LoadFoods } from '../../domain/usecases/load-foods';
import { PrismaModule } from '../shared/prisma/prisma.module';
import { PrismaService } from '../shared/prisma/prisma.service';
import { FoodController } from './food.controller';
import { makeAddFood } from '../../infra/factories/add-food-factory';
import { makeAddFoodSupply } from '../../infra/factories/add-food-supply-factory';
import { makeLoadFoods } from '../../infra/factories/load-foods-factory';

@Module({
  imports: [PrismaModule],
  controllers: [FoodController],
  providers: [
    {
      provide: LoadFoods,
      inject: [PrismaService],
      useFactory: makeLoadFoods
    },
    {
      provide: AddFood,
      inject: [PrismaService],
      useFactory: makeAddFood
    },
    {
      provide: AddFoodSupply,
      inject: [PrismaService],
      useFactory: makeAddFoodSupply
    }
  ]
})
export class FoodModule { }
