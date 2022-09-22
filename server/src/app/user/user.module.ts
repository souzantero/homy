import { Module } from '@nestjs/common'
import { RefreshUserEmailConfirmationCode } from '../../domain/usecases/refresh-user-email-confirmation-code'
import { ConfirmUserEmail } from '../../domain/usecases/confirm-user-email'
import { makeConfirmUserEmail } from '../../infra/factories/confirm-user-email-factory'
import { makeRefreshUserEmailConfirmationCode } from '../../infra/factories/refresh-user-email-confirmation-code-factory'
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
    },
    {
      provide: RefreshUserEmailConfirmationCode,
      inject: [PrismaService],
      useFactory: makeRefreshUserEmailConfirmationCode
    }
  ]
})
export class UserModule {}
