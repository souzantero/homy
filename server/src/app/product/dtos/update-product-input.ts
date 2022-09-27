import { IsNotEmpty, IsString } from 'class-validator'

export class UpdateProductInput {
  @IsString()
  @IsNotEmpty()
  name: string
}
