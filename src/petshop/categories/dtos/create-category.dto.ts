import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @IsString({ message: 'O nome da categoria tem que ser uma String' })
  @IsNotEmpty({ message: 'Faltou informar o nome da categoria' })
  @ApiProperty()
  label: string;
}
