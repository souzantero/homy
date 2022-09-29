import { Type } from 'class-transformer'
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator'

export class ResetPasswordInput {
  @IsEmail()
  @IsNotEmpty()
  @Type(() => String)
  email: string

  @MinLength(8)
  @IsNotEmpty()
  @Type(() => String)
  password: string
}
