import { NestFactory } from '@nestjs/core'
import { PrismaClient } from '@prisma/client'
import * as serverless from 'serverless-http'
import { AppModule } from './app/app.module'

let server
const prisma: PrismaClient = new PrismaClient()

export async function handler(event: any, context) {
  if (!server) {
    const app = await NestFactory.create(AppModule.register({ prisma }), {
      cors: true
    })
    await app.init()
    server = serverless(app.getHttpAdapter().getInstance())
  }

  return server(event, context)
}
