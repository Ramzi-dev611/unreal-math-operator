import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
} from '@nestjs/common';
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
    try {
      const response = this.appService.calculateFibonacci(input);
      return { response };
    } catch {
      throw new BadRequestException(
        'No negative indexes for fibonacci sequence',
      );
    }
  }

  @Post('secondDegreeResolver')
  resolveSecondDegree(
    @Body() payload: SecondDegreeRequestDto,
  ): ServiceResponseDto {
    const { a, b, c } = payload;
    return this.appService.resolveSecondDegreeService(a, b, c);
  }
}
