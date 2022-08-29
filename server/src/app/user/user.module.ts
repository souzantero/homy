import { Module } from '@nestjs/common'
import { ConfirmUserEmail } from '../../domain/usecases/confirm-user-email'
import { makeConfirmUserEmail } from '../../infra/factories/confirm-user-email-factory'
import { PrismaModule } from '../shared/prisma/prisma.module'
import { PrismaService } from '../shared/prisma/prisma.service'
import { UserController } from './user.controller'

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [
    {
      provide: ConfirmUserEmail,
      inject: [PrismaService],
      useFactory: makeConfirmUserEmail
    }
  ]
})
export class UserModule {}
