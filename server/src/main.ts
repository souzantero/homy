import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { AppModule } from './app/app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true })
  const configService = app.get<ConfigService>(ConfigService)
  const port = configService.get('PORT') || 9090
  await app.listen(port)
}
bootstrap()
