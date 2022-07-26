import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
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
    })
  })
});
