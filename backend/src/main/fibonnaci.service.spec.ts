import { Test, TestingModule } from '@nestjs/testing';
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

  // it('should throw an error', () => {
  //   expect(service.calculateFibonacci(-5)).toThrow(
  //     new Error('No negative indexes for fibonacci sequence'),
  //   );
  // });

  it('should be equal to 8', () => {
    expect(service.calculateFibonacci(5)).toEqual(8);
  });

  it('should be equal to 1', () => {
    expect(service.calculateFibonacci(0)).toEqual(1);
  });
});
