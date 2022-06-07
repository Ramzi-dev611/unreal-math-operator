import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppController } from '../src/main/app.controller';
import { AppService } from '../src/main/app.service';

describe('Second degree resolver end point test', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/calculator/secondDegreeResolver (POST) with success case', () => {
    return request(app.getHttpServer())
      .post('/calculator/secondDegreeResolver')
      .send({ a: 4, b: 0, c: -1 })
      .expect('Content-type', /json/)
      .expect(201)
      .expect({ response: -0.5, secondResponse: 0.5 });
  });

  it('/calculator/fibonacci (POST) with edge case delta = 0', () => {
    return request(app.getHttpServer())
      .post('/calculator/secondDegreeResolver')
      .send({ a: 1, b: -2, c: 1 })
      .expect('Content-type', /json/)
      .expect(201)
      .expect({ response: 1 });
  });

  it('/calculator/fibonacci (POST) ---> Error case: negative delta', () => {
    return request(app.getHttpServer())
      .post('/calculator/secondDegreeResolver')
      .send({ a: 1, b: 1, c: 1 })
      .expect('Content-type', /json/)
      .expect(400)
      .expect({
        statusCode: 400,
        message: 'the equation provided has no solution',
        error: 'Bad Request',
      });
  });
});
