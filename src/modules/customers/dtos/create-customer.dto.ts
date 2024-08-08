import {
  IsEmail,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

class CreateAddressDto {
  @IsString({ message: 'O número do endereço tem que ser uma String' })
  @IsNotEmpty({ message: 'Faltou informar o número do endereço' })
  @ApiProperty()
  street: string;

  @IsString({ message: 'O número do endereço tem que ser uma String' })
  @IsNotEmpty({ message: 'Faltou informar o número do endereço' })
  @ApiProperty()
  houseNumber: string;

  @IsOptional()
  @IsString({
    message: 'As informações complementares do endereço tem que ser uma String',
  })
  @ApiProperty({ required: false })
  complement?: string;

  @IsString({ message: 'O bairro do endereço tem que ser uma String' })
  @IsNotEmpty({ message: 'Faltou informar o bairro do endereço' })
  @ApiProperty()
  neighborhood: string;
}

export class CreateCustomerDto {
  @IsString({ message: 'O nome do cliente tem que ser uma String' })
  @IsNotEmpty({ message: 'Faltou informar o nome do cliente' })
  @MinLength(5, {
    message: 'O nome do cliente tem que ter no mínimo 5 caracteres',
  })
  @ApiProperty()
  name: string;

  @IsObject({ message: 'O endereço do cliente tem que ser um objeto' })
  @Type(() => CreateAddressDto)
  @ValidateNested()
  @ApiProperty()
  address: CreateAddressDto;

  @IsOptional()
  @IsEmail(undefined, { message: 'Email invalido' })
  @ApiProperty({ required: false })
  email?: string;

  @IsPhoneNumber('BR', { message: 'Número de celular invalido' })
  @ApiProperty()
  phoneNumber: string;

  @IsOptional()
  @IsString({
    message: 'As redes sociais do cliente tem que ser em formato de String',
  })
  @ApiProperty({ required: false })
  socialMedia?: string;
}

