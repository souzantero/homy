import { Injectable } from "@nestjs/common";
import { PrismaClient } from '@prisma/client';
import { FoodModel } from "src/domain/food/models/food";
import { FoodRepository } from "../../domain/food/food-repository";

@Injectable()
export class FoodPrismaRepository implements FoodRepository {
  constructor(
    private readonly prismaClient: PrismaClient
  ) { }

  loadAll(): Promise<FoodModel[]> {
    return this.prismaClient.food.findMany()
  }
}