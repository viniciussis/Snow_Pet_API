import { ApiProperty } from '@nestjs/swagger';

export class ResponseStockDto {
  @ApiProperty()
  readonly id?: string;

  @ApiProperty({ example: 25 })
  readonly quantity: number;

  @ApiProperty({ example: Date.now() })
  readonly date: Date;
}
