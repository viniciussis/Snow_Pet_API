import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

class ResponseAddressDto {
  @ApiProperty({ example: 'Rua A' })
  readonly street: string;

  @ApiProperty({ example: '123-B' })
  readonly houseNumber: string;

  @ApiProperty({ required: false, example: 'Bloco B' })
  readonly complement?: string;

  @ApiProperty({ example: 'Centro' })
  readonly neighborhood: string;
}

export class ResponseCustomerDto {
  @ApiProperty({ example: 'Alexandre' })
  readonly name: string;

  @ApiProperty({ type: () => ResponseAddressDto })
  @Type(() => ResponseAddressDto)
  readonly address: ResponseAddressDto;

  @ApiProperty({ required: false, example: 'alexandre@example.com' })
  readonly email?: string;

  @ApiProperty({ example: '77999999999' })
  readonly phoneNumber: string;

  @ApiProperty({ required: false, example: '@alexandre' })
  readonly socialMedia?: string;
}

