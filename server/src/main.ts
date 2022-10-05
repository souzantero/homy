import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { PrismaClient } from '@prisma/client'
import { AppModule } from './app/app.module'

async function bootstrap() {
  const prisma: PrismaClient = new PrismaClient()
  const app = await NestFactory.create(AppModule.register({ prisma }), {
    cors: true
  })

  const configService = app.get<ConfigService>(ConfigService)
  const port = configService.get('PORT') || 9090
  await app.listen(port)
}
bootstrap()
