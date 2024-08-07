import { IsString, IsNumber, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateGroomingDto {
  @IsString()
  type?: string;

  @IsNumber()
  @Type(() => Number)
  price?: number;

  @IsDateString()
  date?: string;

  @IsString()
  petId?: string;
}
