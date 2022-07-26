import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as request from 'supertest';
import { AppModule } from '../src/app/app.module';
import { PrismaService } from '../src/app/shared/prisma/prisma.service';

const dropDatabase = async (prismaClient: PrismaClient) => Promise.all([
  prismaClient.food.deleteMany()
])

const findAllFoods = async (prisma: PrismaClient) => prisma.food.findMany()

describe('AppController (e2e)', () => {
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
});
