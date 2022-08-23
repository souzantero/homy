import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
  ValidationPipe
} from '@nestjs/common'
import { AddFoodSupply } from '../../domain/usecases/add-food-supply'
import { AddFood } from '../../domain/usecases/add-food'
import { LoadFoods } from '../../domain/usecases/load-foods'
import { LoadFoodSupplies } from '../../domain/usecases/load-food-supplies'
import { FoodNotFoundError } from '../../domain/errors/food-not-found-error'
import { LoadSuppliedFoods } from '../../domain/usecases/load-supplied-foods'
import { RemoveFoodById } from '../../domain/usecases/remove-food-by-id'
import { LoadFoodById } from '../../domain/usecases/load-food-by-id'
import { UpdateFoodById } from '../../domain/usecases/update-food-by-id'
import { CreateFoodInput } from './dtos/create-food-input'
import { CreateFoodSupplyInput } from './dtos/create-food-supply-input'
import { UpdateFoodInput } from './dtos/update-food-input'
import { AuthorizationTokenGuard } from '../auth/auth.guards'

@Controller('foods')
export class FoodController {
  constructor(
    private readonly addFood: AddFood,
    private readonly addFoodSupply: AddFoodSupply,
    private readonly loadFoods: LoadFoods,
    private readonly loadFoodSupplies: LoadFoodSupplies,
    private readonly loadSuppliedFoods: LoadSuppliedFoods,
    private readonly removeFoodById: RemoveFoodById,
    private readonly loadFoodById: LoadFoodById,
    private readonly updateFoodById: UpdateFoodById
  ) {}

  @Get()
  getFoods() {
    return this.loadFoods.load()
  }

  @Get('supplies/:foodSupplyId/supplied-foods')
  getSuppliedFoods(@Param('foodSupplyId') foodSupplyId: string) {
    return this.loadSuppliedFoods.load({ foodSupplyId })
  }

  @Get('supplies')
  getFoodSupplies() {
    return this.loadFoodSupplies.load()
  }

  @Get(':id')
  async getFood(@Param('id') id: string) {
    const food = await this.loadFoodById.load(id)
    if (!food) {
      throw new NotFoundException('food not found')
    }

    return food
  }

  @UseGuards(AuthorizationTokenGuard)
  @Post()
  createFood(@Body(ValidationPipe) data: CreateFoodInput) {
    return this.addFood.add(data)
  }

  @UseGuards(AuthorizationTokenGuard)
  @Post('supplies')
  async createFoodSupply(@Body(ValidationPipe) data: CreateFoodSupplyInput) {
    try {
      return await this.addFoodSupply.add(data.suppliedFoods)
    } catch (error) {
      if (error instanceof FoodNotFoundError)
        throw new NotFoundException(error.message)
      else throw error
    }
  }

  @UseGuards(AuthorizationTokenGuard)
  @Put(':id')
  async updateFood(
    @Param('id') id: string,
    @Body(ValidationPipe) data: UpdateFoodInput
  ) {
    try {
      return await this.updateFoodById.updateById(id, data)
    } catch (error) {
      if (error instanceof FoodNotFoundError)
        throw new NotFoundException('food not found')
      else throw error
    }
  }

  @UseGuards(AuthorizationTokenGuard)
  @Delete(':id')
  async deleteFood(@Param('id') id: string) {
    try {
      return await this.removeFoodById.remove(id)
    } catch (error) {
      if (error instanceof FoodNotFoundError)
        throw new NotFoundException('food not found')
      else throw error
    }
  }
}
