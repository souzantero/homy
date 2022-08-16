import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { AuthenticateUserByEmailAndPassword } from '../../domain/usecases/authenticate-user-by-email-and-password'
import { SignInWithUser } from '../../domain/usecases/sign-in-with-user'
import { AddUser } from '../../domain/usecases/add-user'
import { makeAuthenticateUserByEmailAndPassword } from '../../infra/factories/authenticate-user-by-email-and-password-factory'
import { makeAddUser } from '../../infra/factories/add-user-factory'
import { AuthController } from './auth.controller'
import { EmailAndPasswordStrategy } from './strategies/email-and-password.strategy'
import { PrismaService } from '../shared/prisma/prisma.service'
import { PrismaModule } from '../shared/prisma/prisma.module'

@Module({
  imports: [PrismaModule, PassportModule],
  controllers: [AuthController],
  providers: [
    EmailAndPasswordStrategy,
    {
      provide: AddUser,
      inject: [PrismaService],
      useFactory: makeAddUser
    },
    {
      provide: AuthenticateUserByEmailAndPassword,
      useFactory: makeAuthenticateUserByEmailAndPassword
    },
    {
      provide: SignInWithUser,
      useFactory: () => new SignInWithUser()
    }
  ]
})
export class AuthModule { }
