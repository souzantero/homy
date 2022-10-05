import { DynamicModule, Global, Module } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { PrismaService } from './prisma.service'

@Global()
@Module({})
export class PrismaModule {
  static register(prisma: PrismaClient): DynamicModule {
    return {
      module: PrismaModule,
      providers: [
        {
          provide: PrismaService,
          useValue: new PrismaService(prisma)
        }
      ],
      exports: [PrismaService]
    }
  }
}
