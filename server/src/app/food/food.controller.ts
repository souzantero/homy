import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { AddFood } from '../../domain/usecases/add-food';
import { LoadFoods } from '../../domain/usecases/load-foods';
import { CreateFoodInput } from './dtos/create-food-input';

@Controller('foods')
export class FoodController {
  constructor(
    private readonly addFood: AddFood,
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
}
