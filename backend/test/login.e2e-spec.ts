import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../src/user/entity/user.entity';
import { userStub } from '../src/authentification/service/stubs/user.stub';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthentificationController } from '../src/authentification/controller/authentification.controller';
import { UserModule } from '../src/user/user.module';
import { AuthentificationService } from '../src/authentification/service/authentification.service';

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
      imports: [
        UserModule,
        PassportModule.register({
          defaultStrategy: 'jwt',
        }),
        JwtModule.register({
          secret: 'test secret',
        }),
      ],
      controllers: [AuthentificationController],
      providers: [AuthentificationService],
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
        expect(token).not.toBeNull();
      });
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
      .send({ username: 'ramzi', password: 'notramzi' })
      .expect(401)
      .then((response) => {
        expect(response.body).toEqual({
          error: 'Unauthorized',
          message: 'incorrect password',
          statusCode: 401,
        });
      });
  });
});
