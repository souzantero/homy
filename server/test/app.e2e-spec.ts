import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as request from 'supertest';
import { AppModule } from '../src/app/app.module';
import { PrismaService } from '../src/app/shared/prisma/prisma.service';

const dropDatabase = async (prismaClient: PrismaClient) => prismaClient.$transaction([
  prismaClient.suppliedFood.deleteMany(),
  prismaClient.foodSupply.deleteMany(),
  prismaClient.food.deleteMany()
])

const findAllFoods = async (prisma: PrismaClient) => prisma.food.findMany()
const findAllFoodSupplies = (prisma: PrismaClient) => prisma.foodSupply.findMany()
const findAllSuppliedFoods = (prisma: PrismaClient) => prisma.suppliedFood.findMany()

describe('App (e2e)', () => {
  let app: INestApplication;
  let prismaClient: PrismaClient

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prismaClient = moduleFixture.get<PrismaService>(PrismaService)
    await dropDatabase(prismaClient)
    await app.init();
  });

  it('/foods (GET)', () => {
    return request(app.getHttpServer())
      .get('/foods')
      .expect(200)
  });

  describe('/foods (POST)', () => {
    it('should create a new food', async () => {
      const response = await request(app.getHttpServer())
        .post('/foods')
        .send({
          name: 'Banana'
        })

      expect(response.status).toBe(201)
      expect(response.body).toBeDefined()
      expect(response.body).toHaveProperty('id')
      expect(response.body).toHaveProperty('name', 'Banana')

      const foods = await findAllFoods(prismaClient)

      expect(foods).toBeDefined()
      expect(foods).toHaveLength(1)
      expect(foods[0]).toHaveProperty('id', response.body.id)
      expect(foods[0]).toHaveProperty('name', response.body.name)
    })

    it('should be fail when name is empty', async () => {
      const response = await request(app.getHttpServer())
        .post('/foods')
        .send({
          name: ''
        })

      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('message', ['name should not be empty'])
    })

    it('should be fail when name is a number', async () => {
      const response = await request(app.getHttpServer())
        .post('/foods')
        .send({
          name: 10
        })

      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('message', ['name must be a string'])
    })
  })

  describe('/foods/supplies (POST)', () => {
    it('should create a new food supply', async () => {
      const createdFoods = await prismaClient.$transaction([
        prismaClient.food.create({ data: { id: '1a', name: 'Banana', createdAt: new Date() } }),
        prismaClient.food.create({ data: { id: '2b', name: 'Maçã', createdAt: new Date() } }),
        prismaClient.food.create({ data: { id: '3c', name: 'Mamão', createdAt: new Date() } })
      ])

      const { status, body } = await request(app.getHttpServer())
        .post('/foods/supplies')
        .send(createdFoods.map(food => ({ foodId: food.id })))

      const foodSupplies = await findAllFoodSupplies(prismaClient)
      expect(foodSupplies).toHaveLength(1)

      const suppliedFoods = await findAllSuppliedFoods(prismaClient)
      expect(suppliedFoods).toHaveLength(3)

      createdFoods.forEach(createdFood => {
        const suppliedFood = suppliedFoods.find(suppliedFood => suppliedFood.foodId === createdFood.id)
        expect(suppliedFood).toBeDefined()
        expect(suppliedFood).toHaveProperty('foodSupplyId', body.id)
        expect(suppliedFood).toHaveProperty('createdAt')
      })

      expect(status).toBe(201)
      expect(body).toBeDefined()
      expect(body).toHaveProperty('id')
      expect(body).toHaveProperty('createdAt')
    })
  })
});