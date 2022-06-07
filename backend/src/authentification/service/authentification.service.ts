import {
  BadRequestException,
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

  async register(payload: LoginDto): Promise<AuthentificationResponseDto> {
    const { username, password } = payload;
    const checkUser: UserEntity = await this.userService.getUserByUsername(
      username,
    );
    if (checkUser != undefined) {
      throw new BadRequestException(
        'There is already a user with provided username',
      );
    }
    const salt = await bcrypt.genSalt();
    const savedPassword = await bcrypt.hash(password, salt);
    const user: UserEntity = await this.userService.saveUser({
      username,
      password: savedPassword,
    });
    return {
      token: await this.jwtService.sign({ id: user.id, username: username }),
    };
  }
}
