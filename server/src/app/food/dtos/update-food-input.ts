import { Type } from 'class-transformer'
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator'

export class UpdateFoodInput {
  @IsString()
  @IsNotEmpty()
  name: string

  @Min(0)
  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  expiresIn: number
}
