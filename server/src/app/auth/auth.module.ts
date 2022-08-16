import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { makeAuthenticateUserByEmailAndPassword } from '../../infra/factories/authenticate-user-by-email-and-password-factory'
import { AuthenticateUserByEmailAndPassword } from '../../domain/usecases/authenticate-user-by-email-and-password'
import { AuthController } from './auth.controller'
import { EmailAndPasswordStrategy } from './strategies/email-and-password.strategy'
import { SignInWithUser } from '../../domain/usecases/sign-in-with-user'

@Module({
  imports: [PassportModule],
  controllers: [AuthController],
  providers: [
    EmailAndPasswordStrategy,
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
