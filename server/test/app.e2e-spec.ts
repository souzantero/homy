import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import * as request from 'supertest'
import { AppModule } from '../src/app/app.module'
import { PrismaService } from '../src/app/shared/prisma/prisma.service'
import { UuidAdapter } from '../src/infra/adapters/uuid-adapter'
import { Identifier } from '../src/domain/protocols/identifier'
import { BcryptAdapter } from '../src/infra/adapters/bcrypt-adapter'
import { HashComparer } from '../src/domain/protocols/hash-comparer'
import { Hasher } from '../src/domain/protocols/hasher'

const serialize = (data: any) => JSON.parse(JSON.stringify(data))

const dropDatabase = async (prisma: PrismaClient) => prisma.$transaction([
  prisma.user.deleteMany(),
  prisma.suppliedFood.deleteMany(),
  prisma.foodSupply.deleteMany(),
  prisma.food.deleteMany()
])

const findAllFoods = (prisma: PrismaClient) => prisma.food.findMany()
const findAllFoodSupplies = (prisma: PrismaClient) => prisma.foodSupply.findMany()
const findAllSuppliedFoods = (prisma: PrismaClient) => prisma.suppliedFood.findMany()
const findAllUsers = (prisma: PrismaClient) => prisma.user.findMany()

describe('App (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaClient
  let identifier: Identifier
  let hasher: Hasher
  let hashComparer: HashComparer

  beforeEach(async () => {
    identifier = new UuidAdapter()
    hasher = new BcryptAdapter(12)
    hashComparer = new BcryptAdapter(12)

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = prisma ? prisma : moduleFixture.get<PrismaService>(PrismaService)
    await dropDatabase(prisma)
    await app.init();
  });

  describe('/auth', () => {
    describe('/sign-up', () => {
      it('should create a new user', async () => {
        const { status, body } = await request(app.getHttpServer())
          .post('/auth/sign-up')
          .set('Content-Type', 'application/json')
          .send({
            name: 'Felipe Antero',
            email: 'souzantero@gmail.com',
            password: '12345678'
          })

        expect(status).toBe(201)
        expect(body).toHaveProperty('id')
        expect(body.id).toBeDefined()
        expect(body).toHaveProperty('name', 'Felipe Antero')
        expect(body).toHaveProperty('email', 'souzantero@gmail.com')
        expect(body).not.toHaveProperty('password')
        expect(body).toHaveProperty('createdAt')
        expect(body.createdAt).toBeDefined()

        const users = await findAllUsers(prisma)
        expect(users).toHaveLength(1)
        expect(users[0]).toHaveProperty('id', body.id)
        expect(users[0]).toHaveProperty('name', body.name)
        expect(users[0]).toHaveProperty('email', body.email)
        expect(users[0]).toHaveProperty('createdAt', new Date(body.createdAt))
        expect(users[0]).toHaveProperty('updatedAt', null)
        expect(users[0]).toHaveProperty('deletedAt', null)
        expect(await hashComparer.compare('12345678', users[0].password)).toBeTruthy()
      })

      it('should fail when user already exists with the same email', async () => {
        await prisma.user.create({
          data: {
            id: identifier.identify(),
            name: 'Felipe Antero',
            email: 'souzantero@gmail.com',
            password: await hasher.hash('12345678'),
            createdAt: new Date()
          }
        })

        const { status, body } = await request(app.getHttpServer())
          .post('/auth/sign-up')
          .set('Content-Type', 'application/json')
          .send({
            name: 'Felipe Antero',
            email: 'souzantero@gmail.com',
            password: '12345678'
          })

        expect(status).toBe(403)
        expect(body).toHaveProperty('message', 'the received email is already in use')
      })

      it('should fail when name is not sent', async () => {
        const { status, body } = await request(app.getHttpServer())
          .post('/auth/sign-up')
          .set('Content-Type', 'application/json')
          .send({
            email: 'souzantero@gmail.com',
            password: '12345678'
          })

        expect(status).toBe(400)
        expect(body).toHaveProperty('message', ['name should not be empty'])
      })

      it('should fail when name is empty', async () => {
        const { status, body } = await request(app.getHttpServer())
          .post('/auth/sign-up')
          .set('Content-Type', 'application/json')
          .send({
            name: '',
            email: 'souzantero@gmail.com',
            password: '12345678'
          })

        expect(status).toBe(400)
        expect(body).toHaveProperty('message', ['name should not be empty'])
      })

      it('should fail when email is not sent', async () => {
        const { status, body } = await request(app.getHttpServer())
          .post('/auth/sign-up')
          .set('Content-Type', 'application/json')
          .send({
            name: 'Felipe Antero',
            password: '12345678'
          })

        expect(status).toBe(400)
        expect(body.message.some(m => m === 'email should not be empty')).toBeTruthy()
      })

      it('should fail when email is empty', async () => {
        const { status, body } = await request(app.getHttpServer())
          .post('/auth/sign-up')
          .set('Content-Type', 'application/json')
          .send({
            name: 'Felipe Antero',
            email: '',
            password: '12345678'
          })

        expect(status).toBe(400)
        expect(body.message.some(m => m === 'email should not be empty')).toBeTruthy()
      })

      it('should fail when email is not a valid email format', async () => {
        const { status, body } = await request(app.getHttpServer())
          .post('/auth/sign-up')
          .set('Content-Type', 'application/json')
          .send({
            name: 'Felipe Antero',
            email: 'Felipe Antero',
            password: '12345678'
          })

        expect(status).toBe(400)
        expect(body.message.some(m => m === 'email must be an email')).toBeTruthy()
      })

      it('should fail when password is not sent', async () => {
        const { status, body } = await request(app.getHttpServer())
          .post('/auth/sign-up')
          .set('Content-Type', 'application/json')
          .send({
            name: 'Felipe Antero',
            email: 'souzantero@gmail.com'
          })

        expect(status).toBe(400)
        expect(body.message.some(m => m === 'password should not be empty')).toBeTruthy()
      })

      it('should fail when password is emtpy', async () => {
        const { status, body } = await request(app.getHttpServer())
          .post('/auth/sign-up')
          .set('Content-Type', 'application/json')
          .send({
            name: 'Felipe Antero',
            email: 'souzantero@gmail.com',
            password: ''
          })

        expect(status).toBe(400)
        expect(body.message.some(m => m === 'password should not be empty')).toBeTruthy()
      })

      it('should fail when password is grether than 8', async () => {
        const { status, body } = await request(app.getHttpServer())
          .post('/auth/sign-up')
          .set('Content-Type', 'application/json')
          .send({
            name: 'Felipe Antero',
            email: 'souzantero@gmail.com',
            password: '1234567'
          })

        expect(status).toBe(400)
        expect(body.message.some(m => m === 'password must be longer than or equal to 8 characters')).toBeTruthy()
      })
    })
  })

  describe('/foods', () => {
    describe('(GET)', () => {
      it('should be success', () => {
        return request(app.getHttpServer())
          .get('/foods')
          .expect(200)
      })

      it('should not get deleted foods', async () => {
        const createdFoods = await prisma.$transaction([
          prisma.food.create({ data: { id: identifier.identify(), name: 'Banana', expiresIn: 8, createdAt: new Date(), deletedAt: new Date() } }),
          prisma.food.create({ data: { id: identifier.identify(), name: 'Maçã', expiresIn: 10, createdAt: new Date() } }),
          prisma.food.create({ data: { id: identifier.identify(), name: 'Mamão', expiresIn: 90, createdAt: new Date() } })
        ])

        const { status, body } = await request(app.getHttpServer()).get('/foods')

        expect(status).toBe(200)
        expect(body).toHaveLength(2)
        expect(body.find(item => item.id === createdFoods[0].id)).toBeUndefined()
      })
    })

    describe('(POST)', () => {
      it('should create a new food', async () => {
        const response = await request(app.getHttpServer())
          .post('/foods')
          .send({
            name: 'Banana',
            expiresIn: 90
          })

        expect(response.status).toBe(201)
        expect(response.body).toBeDefined()
        expect(response.body).toHaveProperty('id')
        expect(response.body).toHaveProperty('name', 'Banana')

        const foods = await findAllFoods(prisma)

        expect(foods).toBeDefined()
        expect(foods).toHaveLength(1)
        expect(foods[0]).toHaveProperty('id', response.body.id)
        expect(foods[0]).toHaveProperty('name', response.body.name)
      })

      it('should fail when name is empty', async () => {
        const response = await request(app.getHttpServer())
          .post('/foods')
          .send({
            name: '',
            expiresIn: 90
          })

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('message', ['name should not be empty'])
      })

      it('should fail when name is a number', async () => {
        const response = await request(app.getHttpServer())
          .post('/foods')
          .send({
            name: 10,
            expiresIn: 90
          })

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('message', ['name must be a string'])
      })
    })

    describe('/:foodId (GET)', () => {
      it('should get a food with supplied foods', async () => {
        const createdFoods = await prisma.$transaction([
          prisma.food.create({ data: { id: identifier.identify(), name: 'Banana', expiresIn: 5, createdAt: new Date() } }),
          prisma.food.create({ data: { id: identifier.identify(), name: 'Maçã', expiresIn: 14, createdAt: new Date() } }),
          prisma.food.create({ data: { id: identifier.identify(), name: 'Mamão', expiresIn: 7, createdAt: new Date() } })
        ])

        const suppliedFoods = createdFoods.map(createdFood => ({
          foodId: createdFood.id,
          createdAt: new Date()
        }))

        await prisma.foodSupply.create({
          data: {
            id: identifier.identify(),
            createdAt: new Date(),
            suppliedFoods: {
              create: suppliedFoods
            }
          }
        })

        const food = createdFoods[0]
        const createdSuppliedFoods = await findAllSuppliedFoods(prisma)
        const filteredSuppliedFoods = createdSuppliedFoods.filter(suppliedFood => suppliedFood.foodId === food.id)

        const { status, body } = await request(app.getHttpServer()).get(`/foods/${food.id}`)
        expect(status).toBe(200)
        expect(body).toBeDefined()
        expect(body).toEqual({
          ...serialize(food),
          suppliedFoods: filteredSuppliedFoods.map(serialize)
        })
      })

      it('should be not found if food not exists', async () => {
        const { status, body } = await request(app.getHttpServer()).get('/foods/fakeId')
        expect(status).toBe(404)
        expect(body).toHaveProperty('message', 'food not found')
      })

      it('should be not found if food is deleted', async () => {
        const food = await prisma.food.create({ data: { id: identifier.identify(), name: 'Banana', expiresIn: 5, createdAt: new Date(), deletedAt: new Date() } })
        const { status, body } = await request(app.getHttpServer()).get(`/foods/${food.id}`)
        expect(status).toBe(404)
        expect(body).toHaveProperty('message', 'food not found')
      })
    })

    describe('/:foodId (PUT)', () => {
      it('should update a exited food', async () => {
        const createdFood = await prisma.food.create({ data: { id: identifier.identify(), name: 'Banana', expiresIn: 5, createdAt: new Date() } })
        const { status } = await request(app.getHttpServer())
          .put(`/foods/${createdFood.id}`)
          .set('Content-Type', 'application/json')
          .send({
            name: 'Caju',
            expiresIn: 10
          })

        expect(status).toBe(200)

        const foods = await findAllFoods(prisma)
        expect(foods).toHaveLength(1)
        expect(foods[0]).toHaveProperty('id', createdFood.id)
        expect(foods[0]).toHaveProperty('name', 'Caju')
        expect(foods[0]).toHaveProperty('expiresIn', 10)
        expect(foods[0]).toHaveProperty('createdAt', createdFood.createdAt)
        expect(foods[0].updatedAt).toBeDefined()
        expect(foods[0].updatedAt.getTime()).toBeGreaterThan(createdFood.createdAt.getTime())
      })

      it('should be not found if food not exists', async () => {
        const { status, body } = await request(app.getHttpServer())
          .put('/foods/fakeId')
          .set('Content-Type', 'application/json')
          .send({
            name: 'Caju',
            expiresIn: 7
          })

        expect(status).toBe(404)
        expect(body).toHaveProperty('message', 'food not found')
      })

      it('should be not found if food is deleted', async () => {
        const food = await prisma.food.create({ data: { id: identifier.identify(), name: 'Banana', expiresIn: 5, createdAt: new Date(), deletedAt: new Date() } })
        const { status, body } = await request(app.getHttpServer())
          .put(`/foods/${food.id}`)
          .set('Content-Type', 'application/json')
          .send({
            name: 'Caju',
            expiresIn: 7
          })

        expect(status).toBe(404)
        expect(body).toHaveProperty('message', 'food not found')
      })
    })

    describe('/:foodId (DELETE)', () => {
      it('should delete a existed food', async () => {
        const createdFoods = await prisma.$transaction([
          prisma.food.create({ data: { id: identifier.identify(), name: 'Banana', expiresIn: 8, createdAt: new Date() } }),
          prisma.food.create({ data: { id: identifier.identify(), name: 'Maçã', expiresIn: 10, createdAt: new Date() } }),
          prisma.food.create({ data: { id: identifier.identify(), name: 'Mamão', expiresIn: 90, createdAt: new Date() } })
        ])

        const { status, body } = await request(app.getHttpServer()).delete(`/foods/${createdFoods[0].id}`)

        expect(status).toBe(200)
        expect(body).toEqual({})

        const foods = await findAllFoods(prisma)
        const deletedFood = foods.find(food => food.id === createdFoods[0].id)
        expect(deletedFood).toBeDefined()
        expect(deletedFood.deletedAt).not.toBeNull()
      })

      it('should be not found if food not exists', async () => {
        const { status, body } = await request(app.getHttpServer()).delete('/foods/fakeId')

        expect(status).toBe(404)
        expect(body).toHaveProperty('message', 'food not found')
      })

      it('should be not found if food is deleted', async () => {
        const food = await prisma.food.create({ data: { id: identifier.identify(), name: 'Banana', expiresIn: 5, createdAt: new Date(), deletedAt: new Date() } })
        const { status, body } = await request(app.getHttpServer()).delete(`/foods/${food.id}`)

        expect(status).toBe(404)
        expect(body).toHaveProperty('message', 'food not found')
      })
    })

    describe('/supplies (GET)', () => {
      it('should get all food supplies', async () => {
        const createdFoodSupplies = await prisma.$transaction([
          prisma.foodSupply.create({ data: { id: identifier.identify(), createdAt: new Date() } }),
          prisma.foodSupply.create({ data: { id: identifier.identify(), createdAt: new Date() } }),
          prisma.foodSupply.create({ data: { id: identifier.identify(), createdAt: new Date() } })
        ])

        const { status, body } = await request(app.getHttpServer()).get('/foods/supplies')

        expect(status).toBe(200)
        expect(body).toHaveLength(3)

        createdFoodSupplies.forEach(createdFoodSupply => {
          const foodSupply = body.find(item => item.id === createdFoodSupply.id)
          expect(foodSupply).toBeDefined()
          expect(foodSupply).toHaveProperty('createdAt', createdFoodSupply.createdAt.toISOString())
        })
      })
    })

    describe('/supplies (POST)', () => {
      it('should create a new food supply', async () => {
        const createdFoods = await prisma.$transaction([
          prisma.food.create({ data: { id: identifier.identify(), name: 'Banana', expiresIn: 8, createdAt: new Date() } }),
          prisma.food.create({ data: { id: identifier.identify(), name: 'Maçã', expiresIn: 10, createdAt: new Date() } }),
          prisma.food.create({ data: { id: identifier.identify(), name: 'Mamão', expiresIn: 90, createdAt: new Date() } })
        ])

        const { status, body } = await request(app.getHttpServer())
          .post('/foods/supplies')
          .send({
            suppliedFoods: createdFoods.map(food => ({ foodId: food.id }))
          })

        expect(status).toBe(201)
        expect(body).toBeDefined()
        expect(body).toHaveProperty('id')
        expect(body).toHaveProperty('createdAt')

        const foodSupplies = await findAllFoodSupplies(prisma)
        expect(foodSupplies).toHaveLength(1)

        const suppliedFoods = await findAllSuppliedFoods(prisma)
        expect(suppliedFoods).toHaveLength(3)

        createdFoods.forEach(createdFood => {
          const suppliedFood = suppliedFoods.find(suppliedFood => suppliedFood.foodId === createdFood.id)
          expect(suppliedFood).toBeDefined()
          expect(suppliedFood).toHaveProperty('foodSupplyId', body.id)
          expect(suppliedFood).toHaveProperty('createdAt')
        })
      })

      it('should fail when a food not exists', async () => {
        const foodId = identifier.identify()

        const { status, body } = await request(app.getHttpServer())
          .post('/foods/supplies')
          .send({
            suppliedFoods: [{ foodId }]
          })

        expect(status).toBe(404)
        expect(body).toHaveProperty('message', `food id ${foodId} not found`)
      })
    })

    describe('/supplies/:foodSupplyId/supplied-foods (GET)', () => {
      it('should get all supplied foods', async () => {
        const createdFoods = await prisma.$transaction([
          prisma.food.create({ data: { id: identifier.identify(), name: 'Banana', expiresIn: 5, createdAt: new Date() } }),
          prisma.food.create({ data: { id: identifier.identify(), name: 'Maçã', expiresIn: 14, createdAt: new Date() } }),
          prisma.food.create({ data: { id: identifier.identify(), name: 'Mamão', expiresIn: 7, createdAt: new Date() } })
        ])

        const suppliedFoods = createdFoods.map(createdFood => ({
          foodId: createdFood.id,
          createdAt: new Date()
        }))

        const createdFoodSupply = await prisma.foodSupply.create({
          data: {
            id: identifier.identify(),
            createdAt: new Date(),
            suppliedFoods: {
              create: suppliedFoods
            }
          }
        })

        const { status, body } = await request(app.getHttpServer())
          .get(`/foods/supplies/${createdFoodSupply.id}/supplied-foods`)

        expect(status).toBe(200)
        expect(body).toHaveLength(3)

        suppliedFoods.forEach(suppliedFood => {
          const createdSuppliedFood = body.find(item => item.foodId === suppliedFood.foodId)
          expect(createdSuppliedFood).toBeDefined()
          expect(createdSuppliedFood).toHaveProperty('foodSupplyId', createdFoodSupply.id)
          expect(createdSuppliedFood).toHaveProperty('createdAt', suppliedFood.createdAt.toISOString())
          expect(createdSuppliedFood).toHaveProperty('food')
          expect(createdSuppliedFood.food).toBeDefined()

          const createdFood = createdFoods.find(createdFood => createdFood.id === suppliedFood.foodId)
          expect(createdSuppliedFood.food).toEqual({ ...createdFood, createdAt: createdFood.createdAt.toISOString() })
        })
      })
    })
  })
});