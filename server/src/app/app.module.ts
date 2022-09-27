import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { ProductModule } from './product/product.module'
import { UserModule } from './user/user.module'
@Module({
  imports: [ConfigModule, AuthModule, UserModule, ProductModule]
})
export class AppModule { }
