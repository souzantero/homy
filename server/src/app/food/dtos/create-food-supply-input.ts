import { Type } from "class-transformer";
import { ArrayNotEmpty, ArrayUnique, IsArray, IsNotEmpty, IsString, IsUUID, Length, MinLength, ValidateNested } from "class-validator";

export class CreateFoodSupplyItem {

  @IsUUID(4)
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