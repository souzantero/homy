import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { FoodModule } from './food/food.module'
import { UserModule } from './user/user.module'
@Module({
  imports: [ConfigModule, AuthModule, UserModule, FoodModule]
})
export class AppModule {}
