import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getUserByUsername(username: string): Promise<UserEntity> {
    const user: UserEntity = await this.userRepository.findOne({
      where: {
        username,
      },
    });
    return user;
  }
}
