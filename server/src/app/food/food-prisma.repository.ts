import { Injectable } from "@nestjs/common";
import { FoodModel } from "src/domain/food/models/food";
import { FoodRepository } from "../../domain/food/food-repository";
import { PrismaService } from '../shared/prisma/prisma.service';

@Injectable()
export class FoodPrismaRepository implements FoodRepository {
  constructor(
    private readonly prismaService: PrismaService
  ) { }

  loadAll(): Promise<FoodModel[]> {
    return this.prismaService.food.findMany()
  }
}