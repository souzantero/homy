import { IsNotEmpty, IsString } from 'class-validator'

export class UpdateSupplyInput {
  @IsString()
  @IsNotEmpty()
  name: string
}
