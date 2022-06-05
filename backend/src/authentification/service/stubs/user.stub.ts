import { UserEntity } from 'src/user/entity/user.entity';

export const userStub = (): UserEntity => {
  return {
    id: 'qslmkdhfqjdsfhqkjdhsflkqjhsdf',
    username: 'ramzi',
    password: '$2a$12$KxU3lEgTJun8l82NSI88oOp4YKH8TqBXWD2JcHe8f5PbduT0DaPGy',
  } as UserEntity;
};
