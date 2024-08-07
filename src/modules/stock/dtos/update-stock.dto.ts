import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class UpdateStockDto {
  @IsOptional()
  @IsPositive()
  @IsNumber()
  quantity: number;
}
