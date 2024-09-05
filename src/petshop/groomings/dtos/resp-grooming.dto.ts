import { ApiProperty } from '@nestjs/swagger';

export class ResponseGroomingDto {
  @ApiProperty()
  id: string;

  @ApiProperty({ required: false, example: 'Banho e Tosa' })
  type: string;

  @ApiProperty({ example: 24.0 })
  price: number;

  @ApiProperty({ required: false, example: Date.now() })
  date?: Date;

  @ApiProperty()
  petId: string;
}
