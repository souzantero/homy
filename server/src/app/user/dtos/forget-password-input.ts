import { Type } from 'class-transformer'
import { IsEmail, IsNotEmpty } from 'class-validator'

export class ForgetPasswordInput {
  @IsEmail()
  @IsNotEmpty()
  @Type(() => String)
  email: string
}
