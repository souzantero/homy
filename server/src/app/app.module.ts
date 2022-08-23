import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { FoodModule } from './food/food.module'
@Module({
  imports: [ConfigModule, AuthModule, FoodModule]
})
export class AppModule {}
