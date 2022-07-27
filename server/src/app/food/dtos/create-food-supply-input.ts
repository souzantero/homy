import { Type } from "class-transformer";
import { ArrayNotEmpty, ArrayUnique, IsArray, IsNotEmpty, IsString, Length, MinLength, ValidateNested } from "class-validator";

export class CreateFoodSupplyItem {

  @IsString()
  @IsNotEmpty()
  foodId: string
}

export class CreateFoodSupplyInput {

  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @ValidateNested()
  @Type(() => CreateFoodSupplyItem)
  suppliedFoods: CreateFoodSupplyItem[]
}