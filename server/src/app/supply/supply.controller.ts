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
import { LoadSupplies } from '../../domain/usecases/load-supplies'
import { LoadSupplyById } from '../../domain/usecases/load-supply-by-id'
import { AddSupply } from '../../domain/usecases/add-supply'
import { UpdateSupplyById } from '../../domain/usecases/update-supply-by-id'
import { RemoveSupplyById } from '../../domain/usecases/remove-supply-by-id'
import { SupplyNotFoundError } from '../../domain/errors/supply-not-found-error'
import { CreateSupplyInput } from './dtos/create-supply-input'
import { UpdateSupplyInput } from './dtos/update-supply-input'
import { AuthorizationTokenGuard } from '../auth/auth.guards'
import { Roles } from '../role/roles.decorator'
import { RolesGuard } from '../role/roles.guard'

@Controller('supplies')
export class SupplyController {
  constructor(
    private readonly loadSupplies: LoadSupplies,
    private readonly loadSupplyById: LoadSupplyById,
    private readonly addSupply: AddSupply,
    private readonly updateSupplyById: UpdateSupplyById,
    private readonly removeSupplyById: RemoveSupplyById
  ) {}

  @Get()
  getSupplies() {
    return this.loadSupplies.load()
  }

  @Get(':id')
  async getSupply(@Param('id') id: string) {
    const supply = await this.loadSupplyById.load(id)
    if (!supply) {
      throw new NotFoundException('supply not found')
    }

    return supply
  }

  @UseGuards(AuthorizationTokenGuard, RolesGuard)
  @Roles(Role.Admin)
  @Post()
  createSupply(@Body(ValidationPipe) data: CreateSupplyInput) {
    return this.addSupply.add(data)
  }

  @UseGuards(AuthorizationTokenGuard, RolesGuard)
  @Roles(Role.Admin)
  @Put(':id')
  async updateSupply(
    @Param('id') id: string,
    @Body(ValidationPipe) data: UpdateSupplyInput
  ) {
    try {
      return await this.updateSupplyById.updateById(id, data)
    } catch (error) {
      if (error instanceof SupplyNotFoundError)
        throw new NotFoundException(error.message)
      else throw error
    }
  }

  @UseGuards(AuthorizationTokenGuard, RolesGuard)
  @Roles(Role.Admin)
  @Delete(':id')
  async deleteSupply(@Param('id') id: string) {
    try {
      return await this.removeSupplyById.remove(id)
    } catch (error) {
      if (error instanceof SupplyNotFoundError)
        throw new NotFoundException(error.message)
      else throw error
    }
  }
}
