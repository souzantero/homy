import { Test, TestingModule } from '@nestjs/testing';
import { LoadFoods } from '../../domain/usecases/load-foods';
import { AddFood } from '../../domain/usecases/add-food';
import { FoodMemoryRepository } from '../../infra/repositories/memory/food-memory-repository';
import { FoodController } from './food.controller';

describe('FoodController', () => {
  let controller: FoodController;
  let addFood: AddFood;
  let foodRepository: FoodMemoryRepository;

  beforeEach(async () => {
    foodRepository = new FoodMemoryRepository()

    const module: TestingModule = await Test.createTestingModule({
      controllers: [FoodController],
      providers: [
        {
          provide: AddFood,
          useValue: new AddFood(foodRepository)
        },
        {
          provide: LoadFoods,
          useValue: new LoadFoods(foodRepository)
        }
      ]
    }).compile();

    controller = module.get<FoodController>(FoodController);
    addFood = module.get<AddFood>(AddFood)
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createFood', () => {
    it('should call addFood use case and return it', async () => {
      const createFoodData = { name: 'Banana' }
      const addFoodResult = { id: Date.now().toString(), ...createFoodData }
      const spyAddFood = jest.spyOn(addFood, 'add').mockResolvedValue(addFoodResult)
      const createFoodResult = await controller.createFood(createFoodData)
      expect(spyAddFood).toHaveBeenCalledWith(createFoodData)
      expect(createFoodResult).toBe(addFoodResult)
    })
  })
});
