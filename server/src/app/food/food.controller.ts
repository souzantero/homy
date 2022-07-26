import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { AddFood } from '../../domain/usecases/add-food';
import { LoadFoods } from '../../domain/usecases/load-foods';
import { CreateFoodData } from './dtos/create-food.dto';

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
  createFood(@Body(ValidationPipe) data: CreateFoodData) {
    return this.addFood.add(data)
  }
}
