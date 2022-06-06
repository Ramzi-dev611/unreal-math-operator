import { BadRequestException, Injectable } from '@nestjs/common';
import ServiceResponseDto from '../dto/serviceResponse.dto';

@Injectable()
export class AppService {
  calculateFibonacci(input: number): number {
    if (input < 0) {
      throw new BadRequestException(
        'No negative indexes for fibonacci sequence',
      );
    }
    let a = 1,
      b = 1,
      response = 1;
    for (let i = 2; i <= input; i++) {
      response = a + b;
      a = b;
      b = response;
    }
    return response;
  }

  resolveSecondDegreeService(
    a: number,
    b: number,
    c: number,
  ): ServiceResponseDto {
    const delta = b * b - 4 * a * c;
    if (delta < 0)
      throw new BadRequestException('the equation provided has no solution');
    else if (delta == 0) return { response: -b / (2 * a) };
    else
      return {
        response: (-b - Math.sqrt(delta)) / (2 * a),
        secondResponse: (-b + Math.sqrt(delta)) / (2 * a),
      };
  }
}
