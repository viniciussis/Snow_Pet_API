import { ApiProperty } from '@nestjs/swagger';

export class ResponseProductDto {
  @ApiProperty()
  readonly id?: string;

  @ApiProperty({ example: 'Ração de cachorro' })
  readonly name: string;

  @ApiProperty({ example: 'Pedigree' })
  readonly brand: string;

  @ApiProperty({ required: false, example: 'Ração pedigree sem conservantes' })
  readonly description?: string;

  @ApiProperty({ example: 25 })
  readonly price: number;

  @ApiProperty({ example: '1kg' })
  readonly measure: string;

  @ApiProperty()
  readonly categoryId?: string;
}
