import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import ServiceResponseDto from 'src/dto/serviceResponse.dto';
import { AppService } from './app.service';

describe('Fibonacci', () => {
  let service: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw an error', () => {
    expect(() => {
      service.resolveSecondDegreeService(1, 1, 1);
    }).toThrow('the equation provided has no solution');
  });

  it('should return two responses with values -0.5 and 0.5', () => {
    const serviceResponse: ServiceResponseDto =
      service.resolveSecondDegreeService(4, 0, -1);
    expect(serviceResponse).toBeDefined();
    expect(serviceResponse.response).toEqual(-0.5);
    expect(serviceResponse.secondResponse).toBeDefined();
    expect(serviceResponse.secondResponse).toEqual(0.5);
  });

  it('should return one response with value -1', () => {
    const serviceResponse: ServiceResponseDto =
      service.resolveSecondDegreeService(1, 2, 1);
    expect(serviceResponse).toBeDefined();
    expect(serviceResponse.secondResponse).toBeUndefined();
    expect(serviceResponse.response).toEqual(-1);
  });
});
