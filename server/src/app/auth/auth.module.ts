import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { makeAuthenticateUserByEmailAndPassword } from '../../infra/factories/authenticate-user-by-email-and-password-factory'
import { AuthenticateUserByEmailAndPassword } from '../../domain/usecases/authenticate-user-by-email-and-password'
import { AuthController } from './auth.controller'
import { LocalStrategy } from './strategies/local.strategy'

@Module({
  imports: [PassportModule],
  controllers: [AuthController],
  providers: [
    LocalStrategy,
    {
      provide: AuthenticateUserByEmailAndPassword,
      useFactory: makeAuthenticateUserByEmailAndPassword
    }
  ]
})
export class AuthModule { }
