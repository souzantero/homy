import { Module } from '@nestjs/common'
import { AddSupply } from '../../domain/usecases/add-supply'
import { LoadSupplies } from '../../domain/usecases/load-supplies'
import { RemoveSupplyById } from '../../domain/usecases/remove-supply-by-id'
import { LoadSupplyById } from '../../domain/usecases/load-supply-by-id'
import { UpdateSupplyById } from '../../domain/usecases/update-supply-by-id'
import { PrismaModule } from '../shared/prisma/prisma.module'
import { PrismaService } from '../shared/prisma/prisma.service'
import { SupplyController } from './supply.controller'
import { makeLoadSupplyById } from './factories/load-supply-by-id-factory'
import { makeLoadSupplies } from './factories/load-supplies-factory'
import { makeAddSupply } from './factories/add-supply-factory'
import { makeUpdateSupplyById } from './factories/update-supply-by-id-factory'
import { makeRemoveSupplyById } from './factories/remove-supply-by-id-factory'

@Module({
  imports: [PrismaModule],
  controllers: [SupplyController],
  providers: [
    {
      provide: LoadSupplies,
      inject: [PrismaService],
      useFactory: (prisma: PrismaService) => makeLoadSupplies(prisma.client)
    },
    {
      provide: AddSupply,
      inject: [PrismaService],
      useFactory: (prisma: PrismaService) => makeAddSupply(prisma.client)
    },
    {
      provide: RemoveSupplyById,
      inject: [PrismaService],
      useFactory: (prisma: PrismaService) => makeRemoveSupplyById(prisma.client)
    },
    {
      provide: LoadSupplyById,
      inject: [PrismaService],
      useFactory: (prisma: PrismaService) => makeLoadSupplyById(prisma.client)
    },
    {
      provide: UpdateSupplyById,
      inject: [PrismaService],
      useFactory: (prisma: PrismaService) => makeUpdateSupplyById(prisma.client)
    }
  ]
})
export class SupplyModule {}
