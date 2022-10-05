import { INestApplication, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

export class PrismaService implements OnModuleInit {
  constructor(private readonly prisma: PrismaClient) {}

  get client(): PrismaClient {
    return this.prisma
  }

  async onModuleInit() {
    await this.prisma.$connect()
  }

  async enableShutdownHooks(app: INestApplication) {
    this.prisma.$on('beforeExit', async () => {
      await app.close()
    })
  }
}
