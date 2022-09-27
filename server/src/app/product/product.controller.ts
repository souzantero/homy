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
import { Role } from '../../domain/models/user'
import { AddProduct } from '../../domain/usecases/add-product'
import { LoadProducts } from '../../domain/usecases/load-products'
import { ProductNotFoundError } from '../../domain/errors/product-not-found-error'
import { RemoveProductById } from '../../domain/usecases/remove-product-by-id'
import { LoadProductById } from '../../domain/usecases/load-product-by-id'
import { UpdateProductById } from '../../domain/usecases/update-product-by-id'
import { CreateProductInput } from './dtos/create-product-input'
import { UpdateProductInput } from './dtos/update-product-input'
import { AuthorizationTokenGuard } from '../auth/auth.guards'
import { Roles } from '../role/roles.decorator'
import { RolesGuard } from '../role/roles.guard'

@Controller('products')
export class ProductController {
  constructor(
    private readonly addProduct: AddProduct,
    private readonly loadProducts: LoadProducts,
    private readonly loadProductById: LoadProductById,
    private readonly updateProductById: UpdateProductById,
    private readonly removeProductById: RemoveProductById
  ) { }

  @Get()
  getProducts() {
    return this.loadProducts.load()
  }

  @Get(':id')
  async getProduct(@Param('id') id: string) {
    const product = await this.loadProductById.load(id)
    if (!product) {
      throw new NotFoundException('product not found')
    }

    return product
  }

  @UseGuards(AuthorizationTokenGuard, RolesGuard)
  @Roles(Role.Admin)
  @Post()
  createProduct(@Body(ValidationPipe) data: CreateProductInput) {
    return this.addProduct.add(data)
  }


  @UseGuards(AuthorizationTokenGuard, RolesGuard)
  @Roles(Role.Admin)
  @Put(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body(ValidationPipe) data: UpdateProductInput
  ) {
    try {
      return await this.updateProductById.updateById(id, data)
    } catch (error) {
      if (error instanceof ProductNotFoundError)
        throw new NotFoundException(error.message)
      else throw error
    }
  }

  @UseGuards(AuthorizationTokenGuard, RolesGuard)
  @Roles(Role.Admin)
  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    try {
      return await this.removeProductById.remove(id)
    } catch (error) {
      if (error instanceof ProductNotFoundError)
        throw new NotFoundException(error.message)
      else throw error
    }
  }
}
