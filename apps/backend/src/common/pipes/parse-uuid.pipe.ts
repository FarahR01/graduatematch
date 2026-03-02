import {
  PipeTransform,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { validate } from 'uuid';

/**
 * ParseUUIDPipe - Validates and parses UUID parameters
 * Provides clearer error messages than built-in ParseUUIDPipe
 */
@Injectable()
export class ParseUUIDPipe implements PipeTransform<string> {
  constructor(private readonly paramName: string = 'id') {}

  transform(value: string): string {
    if (!value) {
      throw new BadRequestException(`${this.paramName} is required`);
    }

    if (!validate(value)) {
      throw new BadRequestException(`${this.paramName} must be a valid UUID`);
    }

    return value;
  }
}
