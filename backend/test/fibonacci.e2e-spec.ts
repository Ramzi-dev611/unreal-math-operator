import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppController } from '../src/main/app.controller';
import { AppService } from '../src/main/app.service';

describe('Fibonacci end point test', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/calculator/fibonacci (POST) with success case', () => {
    return request(app.getHttpServer())
      .post('/calculator/fibonacci')
      .send({ input: 5 })
      .expect('Content-type', /json/)
      .expect(201)
      .expect({ response: 8 });
  });

  it('/calculator/fibonacci (POST) with edge case 0', () => {
    return request(app.getHttpServer())
      .post('/calculator/fibonacci')
      .send({ input: 0 })
      .expect('Content-type', /json/)
      .expect(201)
      .expect({ response: 1 });
  });

  it('/calculator/fibonacci (POST) ---> Error case: negative request', () => {
    return request(app.getHttpServer())
      .post('/calculator/fibonacci')
      .send({ input: -1 })
      .expect('Content-type', /json/)
      .expect(400)
      .expect({
        statusCode: 400,
        message: 'No negative indexes for fibonacci sequence',
        error: 'Bad Request',
      });
  });
});
