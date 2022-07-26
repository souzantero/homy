import { IsNotEmpty, IsString } from "class-validator";

export class CreateFoodInput {

  @IsNotEmpty()
  @IsString()
  name: string
}