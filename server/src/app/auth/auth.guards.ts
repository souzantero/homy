import { Injectable } from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"

@Injectable()
export class EmailAndPasswordGuard extends AuthGuard('email-and-password') { }

@Injectable()
export class AuthorizationTokenGuard extends AuthGuard('authorization-token') { }