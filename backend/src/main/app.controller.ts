import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import FibonacciRequestDto from '../dto/fibonacciRequest.dto';
import SecondDegreeRequestDto from '../dto/secondDegreeRequest.dto';
import ServiceResponseDto from '../dto/serviceResponse.dto';
import { UserService } from 'src/user/repository/user.service';
import { UserEntity } from 'src/user/entity/user.entity';

@Controller('calculator')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userRepository: UserService,
  ) {}

  @Post('fibonacci')
  calculateFibonacci(@Body() payload: FibonacciRequestDto): ServiceResponseDto {
    const { input } = payload;
    const response = this.appService.calculateFibonacci(input);
    return { response };
  }

  @Get()
  async getuserbyusername(
    @Body('username') username: string,
  ): Promise<UserEntity> {
    return this.userRepository.getUserByUsername(username);
  }

  @Post('secondDegreeResolver')
  resolveSecondDegree(
    @Body() payload: SecondDegreeRequestDto,
  ): ServiceResponseDto {
    const { a, b, c } = payload;
    return this.appService.resolveSecondDegreeService(a, b, c);
  }
}
