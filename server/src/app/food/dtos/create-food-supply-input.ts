import { IsNotEmpty, IsString } from "class-validator";

export class CreateFoodSupplyItem {
  
  @IsString()
  @IsNotEmpty()
  foodId: string
}

export type CreateFoodSupplyInput = CreateFoodSupplyItem[]