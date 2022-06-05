import { userStub } from '../../authentification/service/stubs/user.stub';

export const UserServiceMock = {
  getUserByUsername: jest.fn((data) => {
    return userStub();
  }),
};
