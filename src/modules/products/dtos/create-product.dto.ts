import {
  IsNotEmpty,
  IsPositive,
  IsOptional,
  IsString,
  IsNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @IsString({ message: 'O nome do produto tem que ser uma String' })
  @IsNotEmpty({ message: 'Faltou informar o nome do produto' })
  @ApiProperty()
  name: string;

  @IsString({ message: 'O nome da marca tem que ser uma String' })
  @IsNotEmpty({ message: 'Faltou informar o nome da marca' })
  @ApiProperty()
  brand: string;

  @IsString({ message: 'A descrição tem que ser uma String' })
  @IsOptional()
  @ApiProperty({ required: false })
  description?: string;

  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'O preço deve ser um número.' })
  @IsPositive({ message: 'O preço deve ser um número positivo.' })
  @ApiProperty()
  price: number;

  @IsString({
    message: 'A unidade de medida do produto tem que ser uma String',
  })
  @IsNotEmpty({ message: 'Faltou informar a unidade de medida do produto' })
  @ApiProperty()
  measure: string;

  @IsString({ message: 'O Id da categoria tem que ser uma String' })
  @ApiProperty()
  categoryId: string;
}
