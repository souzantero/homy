import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { RefreshUserEmailConfirmationCode } from '../../domain/usecases/refresh-user-email-confirmation-code'
import { ConfirmUserEmail } from '../../domain/usecases/confirm-user-email'
import { CreateUserPasswordResetToken } from '../../domain/usecases/create-user-password-reset-token'
import { makeConfirmUserEmail } from '../../infra/factories/confirm-user-email-factory'
import { makeRefreshUserEmailConfirmationCode } from '../../infra/factories/refresh-user-email-confirmation-code-factory'
import { makeCreateUserPasswordResetToken } from '../../infra/factories/create-user-password-reset-token-factory'
import { PrismaModule } from '../shared/prisma/prisma.module'
import { PrismaService } from '../shared/prisma/prisma.service'
import { UserController } from './user.controller'

@Module({
  imports: [PrismaModule, ConfigModule],
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
    },
    {
      provide: CreateUserPasswordResetToken,
      inject: [PrismaService, ConfigService],
      useFactory: (prisma: PrismaService, config: ConfigService) =>
        makeCreateUserPasswordResetToken(
          prisma,
          config.get<string>('JWT_SECRET')
        )
    }
  ]
})
export class UserModule {}
