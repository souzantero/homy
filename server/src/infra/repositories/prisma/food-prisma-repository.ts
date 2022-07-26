import { PrismaClient } from '@prisma/client';
import { FoodModel } from "../../../domain/models/food";
import { FoodRepository } from "../../../domain/repositories/food-repository";

export class FoodPrismaRepository implements FoodRepository {
  constructor(
    private readonly prismaClient: PrismaClient
  ) { }

  loadAll(): Promise<FoodModel[]> {
    return this.prismaClient.food.findMany()
  }
}