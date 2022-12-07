import { IsNotEmpty, IsString } from 'class-validator'

export class CreateSupplyInput {
  @IsString()
  @IsNotEmpty()
  name: string
}
