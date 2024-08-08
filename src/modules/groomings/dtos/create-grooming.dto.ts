import {
  IsDateString,
  IsPositive,
  IsNotEmpty,
  IsString,
  IsNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGroomingDto {
  @IsString({ message: 'O tipo de serviço do pet tem que ser uma String' })
  @IsNotEmpty({ message: 'Faltou informar o tipo de serviço do pet' })
  @ApiProperty()
  type: string;

  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'O preço deve ser um número.' })
  @IsPositive({ message: 'O preço deve ser um número positivo.' })
  @ApiProperty()
  price: number;

  @IsDateString()
  @ApiProperty({ required: false })
  date?: string;

  @IsString({ message: 'O Id do pet tem que ser uma String' })
  @ApiProperty()
  petId: string;
}
