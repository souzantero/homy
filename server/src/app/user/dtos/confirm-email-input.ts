import { Type } from 'class-transformer'
import { IsNotEmpty, IsString } from 'class-validator'

export class ConfirmEmailInput {
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  confirmationCode: string
}
