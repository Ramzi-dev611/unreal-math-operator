import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import AuthentificationResponseDto from '../../dto/authentificationResponse.dto';
import LoginDto from '../../dto/login.dto';
import { UserEntity } from '../../user/entity/user.entity';
import { UserService } from '../../user/repository/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthentificationService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(payload: LoginDto): Promise<AuthentificationResponseDto> {
    const { username, password } = payload;
    const user: UserEntity = await this.userService.getUserByUsername(username);
    if (user == undefined) {
      throw new NotFoundException('There is no user with provided username');
    }
    const correctPassowrd = await bcrypt.compare(password, user.password);
    if (correctPassowrd) {
      return {
        token: await this.jwtService.sign({ id: user.id, username: username }),
      };
    } else throw new UnauthorizedException('incorrect password');
  }
}
