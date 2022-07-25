import { Controller, Get } from '@nestjs/common';

@Controller('foods')
export class FoodController {

    @Get()
    getAllFoods() {
        return []
    }
}
