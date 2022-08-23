import { Module } from '@nestjs/common'
import { AddFoodSupply } from '../../domain/usecases/add-food-supply'
import { AddFood } from '../../domain/usecases/add-food'
import { LoadFoods } from '../../domain/usecases/load-foods'
import { LoadFoodSupplies } from '../../domain/usecases/load-food-supplies'
import { LoadSuppliedFoods } from '../../domain/usecases/load-supplied-foods'
import { RemoveFoodById } from '../../domain/usecases/remove-food-by-id'
import { LoadFoodById } from '../../domain/usecases/load-food-by-id'
import { UpdateFoodById } from '../../domain/usecases/update-food-by-id'
import { PrismaModule } from '../shared/prisma/prisma.module'
import { PrismaService } from '../shared/prisma/prisma.service'
import { FoodController } from './food.controller'
import { makeAddFood } from '../../infra/factories/add-food-factory'
import { makeAddFoodSupply } from '../../infra/factories/add-food-supply-factory'
import { makeLoadFoods } from '../../infra/factories/load-foods-factory'
import { makeLoadFoodSupplies } from '../../infra/factories/load-food-supplies-factory'
import { makeLoadSuppliedFoods } from '../../infra/factories/load-supplied-foods-factory'
import { makeRemoveFoodById } from '../../infra/factories/remove-food-by-id-factory'
import { makeLoadFoodById } from '../../infra/factories/load-food-by-id-factory'
import { makeUpdateFoodById } from '../../infra/factories/update-food-by-id-factory'

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
    },
    {
      provide: LoadFoodSupplies,
      inject: [PrismaService],
      useFactory: makeLoadFoodSupplies
    },
    {
      provide: LoadSuppliedFoods,
      inject: [PrismaService],
      useFactory: makeLoadSuppliedFoods
    },
    {
      provide: RemoveFoodById,
      inject: [PrismaService],
      useFactory: makeRemoveFoodById
    },
    {
      provide: LoadFoodById,
      inject: [PrismaService],
      useFactory: makeLoadFoodById
    },
    {
      provide: UpdateFoodById,
      inject: [PrismaService],
      useFactory: makeUpdateFoodById
    }
  ]
})
export class FoodModule {}
