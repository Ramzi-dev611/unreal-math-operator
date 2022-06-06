import { userStub } from '../../authentification/service/stubs/user.stub';

export const UserServiceMock = {
  getUserByUsername: jest.fn((dto) => {
    if (dto === 'ramzi') {
      return userStub();
    } else {
      return undefined;
    }
  }),
};
