import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AuthentificationModule } from '../src/authentification/authentification.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../src/user/entity/user.entity';
import { userStub } from '../src/authentification/service/stubs/user.stub';

describe('login endpoint test', () => {
  let app: INestApplication;
  // Mock the database access -> This technique can be changed by instanciating a new for root and connect to another testing database
  const userRepositoyMock = {
    findOne: jest.fn().mockImplementation(({ where: { username } }) => {
      if (username === 'ramzi') {
        return userStub();
      } else return undefined;
    }),
  };
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AuthentificationModule],
    })
      .overrideProvider(getRepositoryToken(UserEntity))
      .useValue(userRepositoyMock)
      .compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('POST: login with valid credentials should return a token', () => {
    return request(app.getHttpServer())
      .post('/authentification/login')
      .send({ username: 'ramzi', password: 'ramzi' })
      .expect(201)
      .then((response) => {
        const { token } = response.body;
        expect(token).toBeInstanceOf(String);
      })
      .catch((error) => console.log(error));
  });

  it('POST: login with unvalid usernamemust throw an error', () => {
    return request(app.getHttpServer())
      .post('/authentification/login')
      .send({ username: 'wassim', password: 'ramzi' })
      .expect(404)
      .then((response) => {
        expect(response.body).toEqual({
          error: 'Not Found',
          message: 'There is no user with provided username',
          statusCode: 404,
        });
      });
  });

  it('POST: login with wrong password should throw an error', () => {
    return request(app.getHttpServer())
      .post('/authentification/login')
      .send({ username: 'notramzi', password: 'ramzi' })
      .expect(403)
      .then((response) => {
        expect(response.body).toEqual({
          error: 'Unauthorized',
          message: 'incorrect password',
          statusCode: 404,
        });
      })
      .catch((error) => console.log(error));
  });
});
