import { DynamicModule, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppModuleOptions } from './app.interfaces'
import { AuthModule } from './auth/auth.module'
import { ProductModule } from './product/product.module'
import { PrismaModule } from './shared/prisma/prisma.module'
import { UserModule } from './user/user.module'
@Module({})
export class AppModule {
  static register({ prisma }: AppModuleOptions): DynamicModule {
    return {
      module: AppModule,
      imports: [
        PrismaModule.register(prisma),
        ConfigModule,
        AuthModule,
        UserModule,
        ProductModule
      ]
    }
  }
}
