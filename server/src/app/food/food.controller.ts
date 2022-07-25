import { Controller, Get } from '@nestjs/common';
import { LoadFoods } from '../../domain/food/usecases/load-foods';

@Controller('foods')
export class FoodController {
  constructor(
    private readonly loadFoods: LoadFoods
  ) { }

  @Get()
  getFoods() {
    return this.loadFoods.load()
  }
}
