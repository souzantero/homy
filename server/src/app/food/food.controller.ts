import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { AddFoodSupply } from '../../domain/usecases/add-food-supply';
import { AddFood } from '../../domain/usecases/add-food';
import { LoadFoods } from '../../domain/usecases/load-foods';
import { CreateFoodInput } from './dtos/create-food-input';
import { CreateFoodSupplyInput } from './dtos/create-food-supply-input';

@Controller('foods')
export class FoodController {
  constructor(
    private readonly addFood: AddFood,
    private readonly addFoodSupply: AddFoodSupply,
    private readonly loadFoods: LoadFoods
  ) { }

  @Get()
  getFoods() {
    return this.loadFoods.load()
  }

  @Post()
  createFood(@Body(ValidationPipe) data: CreateFoodInput) {
    return this.addFood.add(data)
  }

  @Post('supplies')
  createFoodSupply(@Body(ValidationPipe) data: CreateFoodSupplyInput) {
    return this.addFoodSupply.add(data.suppliedFoods)
  }
}
