import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { UserModule } from '../../user/user.module';
import { AuthentificationService } from './authentification.service';
import { UserService } from '../../user/repository/user.service';
import AuthentificationResponseDto from '../../dto/authentificationResponse.dto';
import { UserServiceMock } from '../../user/__mocks__/user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../../user/entity/user.entity';

describe('Authentication', () => {
  let service: AuthentificationService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PassportModule.register({
          defaultStrategy: 'jwt',
        }),
        JwtModule.register({
          secret: 'test secret',
        }),
        UserModule,
      ],
      providers: [AuthentificationService],
    })
      .overrideProvider(getRepositoryToken(UserEntity))
      .useValue({})
      .overrideProvider(UserService)
      .useValue(UserServiceMock)
      .compile();
    service = module.get<AuthentificationService>(AuthentificationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a token', async () => {
    // with
    const payload = {
      username: 'ramzi',
      password: 'ramzi',
    };
    const response: AuthentificationResponseDto = await service.login(payload);
    expect(response).toBeDefined();
    expect(response.token).not.toBeNull();
  });

  it('should raise a not found exception', async () => {
    const payload = {
      username: 'wassim',
      password: 'ramzi',
    };
    await expect(service.login(payload)).rejects.toThrow(
      'There is no user with provided username',
    );
  });

  it('should raise a Unauthorized exception', async () => {
    const payload = {
      username: 'ramzi',
      password: 'notramzi',
    };
    await expect(service.login(payload)).rejects.toThrow('incorrect password');
  });
});
