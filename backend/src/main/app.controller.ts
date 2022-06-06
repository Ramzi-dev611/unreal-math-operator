import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import FibonacciRequestDto from '../dto/fibonacciRequest.dto';
import SecondDegreeRequestDto from '../dto/secondDegreeRequest.dto';
import ServiceResponseDto from '../dto/serviceResponse.dto';
@Controller('calculator')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('fibonacci')
  calculateFibonacci(@Body() payload: FibonacciRequestDto): ServiceResponseDto {
    const { input } = payload;
    const response = this.appService.calculateFibonacci(input);
    return { response };
  }

  @Post('secondDegreeResolver')
  resolveSecondDegree(
    @Body() payload: SecondDegreeRequestDto,
  ): ServiceResponseDto {
    const { a, b, c } = payload;
    return this.appService.resolveSecondDegreeService(a, b, c);
  }
}
