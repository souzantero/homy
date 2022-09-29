import { Type } from 'class-transformer'
import { IsNotEmpty, MinLength } from 'class-validator'

export class ResetPasswordInput {
  @MinLength(8)
  @IsNotEmpty()
  @Type(() => String)
  password: string
}
