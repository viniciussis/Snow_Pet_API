import { ApiProperty } from '@nestjs/swagger';

export class ResponseCategoryDto {
  @ApiProperty({ example: 'Comida' })
  readonly label: string;
}
