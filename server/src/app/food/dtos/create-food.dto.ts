import { IsNotEmpty, IsString } from "class-validator";

export class CreateFoodData {

  @IsNotEmpty()
  @IsString()
  name: string
}