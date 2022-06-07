import { Body, Controller, Post } from '@nestjs/common';
import AuthentificationResponseDto from '../../dto/authentificationResponse.dto';
import LoginDto from '../../dto/login.dto';
import { AuthentificationService } from '../service/authentification.service';

@Controller('authentification')
export class AuthentificationController {
  constructor(private readonly authService: AuthentificationService) {}

  @Post('login')
  async login(@Body() payload: LoginDto): Promise<AuthentificationResponseDto> {
    return await this.authService.login(payload);
  }

  @Post('register')
  async register(
    @Body() payload: LoginDto,
  ): Promise<AuthentificationResponseDto> {
    return await this.authService.register(payload);
  }
}
