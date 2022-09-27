import { IsNotEmpty, IsString } from 'class-validator'

export class CreateProductInput {
  @IsString()
  @IsNotEmpty()
  name: string
}
