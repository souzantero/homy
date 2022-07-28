import { Test, TestingModule } from '@nestjs/testing';
import { LoadFoods } from '../../domain/usecases/load-foods';
import { AddFood } from '../../domain/usecases/add-food';
import { AddFoodSupply } from '../../domain/usecases/add-food-supply';
import { AddFoodSupplyValidator } from '../../domain/validators/add-food-supply-validator';
import { FoodMemoryRepository } from '../../infra/repositories/memory/food-memory-repository';
import { FoodController } from './food.controller';
import { UuidAdapter } from '../../infra/adapters/uuid-adapter';
import { FoodSupplyMemoryRepository } from '../../infra/repositories/memory/food-supply-memory-repository';

describe('FoodController', () => {
  let controller: FoodController
  let addFood: AddFood
  let addFoodSupply: AddFoodSupply
  let foodRepository: FoodMemoryRepository
  let foodSupplyRepository: FoodSupplyMemoryRepository

  beforeEach(async () => {
    foodRepository = new FoodMemoryRepository()
    foodSupplyRepository = new FoodSupplyMemoryRepository()

    const module: TestingModule = await Test.createTestingModule({
      controllers: [FoodController],
      providers: [
        {
          provide: AddFood,
          useValue: new AddFood(new UuidAdapter(), foodRepository)
        },
        {
          provide: AddFoodSupply,
          useValue: new AddFoodSupply(new UuidAdapter(), foodSupplyRepository, new AddFoodSupplyValidator(foodRepository))
        },
        {
          provide: LoadFoods,
          useValue: new LoadFoods(foodRepository)
        }
      ]
    }).compile();

    controller = module.get<FoodController>(FoodController);
    addFood = module.get<AddFood>(AddFood)
    addFoodSupply = module.get<AddFoodSupply>(AddFoodSupply)
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createFood', () => {
    it('should call addFood use case and return it', async () => {
      const createFoodInput = { name: 'Banana', expiresIn: 90 }
      const addFoodResult = { id: Date.now().toString(), createdAt: new Date(), ...createFoodInput }
      const spyAddFood = jest.spyOn(addFood, 'add').mockResolvedValue(addFoodResult)
      const createFoodResult = await controller.createFood(createFoodInput)
      expect(spyAddFood).toHaveBeenCalledWith(createFoodInput)
      expect(createFoodResult).toBe(addFoodResult)
    })
  })

  describe('createFoodSupply', () => {
    it('should call addFoodSupply use case and return it', async () => {
      const createFoodSupplyInput = { suppliedFoods: [] }
      const addFoodSupplyResult = { id: Date.now().toString(), createdAt: new Date() }
      const spyAddFoodSupply = jest.spyOn(addFoodSupply, 'add').mockResolvedValue(addFoodSupplyResult)
      const createFoodSupplyResult = await controller.createFoodSupply(createFoodSupplyInput)
      expect(spyAddFoodSupply).toHaveBeenCalledWith(createFoodSupplyInput.suppliedFoods)
      expect(createFoodSupplyResult).toBe(addFoodSupplyResult)
    })
  })
});
