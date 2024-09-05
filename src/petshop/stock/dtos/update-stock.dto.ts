import { IsInt, IsNumber, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateStockDto {
  @IsPositive({ message: 'Tem que ser um número positivo' })
  @IsNumber(undefined, { message: 'Tem que ser um número' })
  @IsInt({ message: 'Tem que ser um número inteiro' })
  @ApiProperty()
  quantity: number;
}
