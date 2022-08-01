import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FoodModule } from './food/food.module';
@Module({
  imports: [ConfigModule, FoodModule],
})
export class AppModule { }
