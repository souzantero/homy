import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { RefreshUserEmailConfirmationCode } from '../../domain/usecases/refresh-user-email-confirmation-code'
import { ConfirmUserEmail } from '../../domain/usecases/confirm-user-email'
import { ForgetUserPassword } from '../../domain/usecases/forget-user-password'
import { ResetUserPassword } from '../../domain/usecases/reset-user-password'
import { makeConfirmUserEmail } from '../../infra/factories/confirm-user-email-factory'
import { makeRefreshUserEmailConfirmationCode } from '../../infra/factories/refresh-user-email-confirmation-code-factory'
import { makeForgetUserPassword } from '../../infra/factories/create-user-password-reset-token-factory'
import { makeResetUserPassword } from '../../infra/factories/reset-user-password-factory'
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
      useFactory: (prisma: PrismaService) => makeConfirmUserEmail(prisma.client)
    },
    {
      provide: ResetUserPassword,
      inject: [PrismaService, ConfigService],
      useFactory: (prisma: PrismaService, config: ConfigService) =>
        makeResetUserPassword(prisma.client, +config.get<number>('BCRYPT_SALT'))
    },
    {
      provide: RefreshUserEmailConfirmationCode,
      inject: [PrismaService],
      useFactory: (prisma: PrismaService) =>
        makeRefreshUserEmailConfirmationCode(prisma.client)
    },
    {
      provide: ForgetUserPassword,
      inject: [PrismaService, ConfigService],
      useFactory: (prisma: PrismaService, config: ConfigService) =>
        makeForgetUserPassword(prisma.client, config.get<string>('JWT_SECRET'))
    }
  ]
})
export class UserModule {}
