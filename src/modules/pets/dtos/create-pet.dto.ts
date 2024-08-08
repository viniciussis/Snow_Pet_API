import {
  IsOptional,
  IsNotEmpty,
  IsBoolean,
  IsString,
  IsEnum,
} from 'class-validator';
import { PetGender, PetSize, PetSpecie } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePetDto {
  @IsString({ message: 'O nome do pet tem que ser uma String' })
  @IsNotEmpty({ message: 'Faltou informar o nome do pet' })
  @ApiProperty()
  name: string;

  @IsEnum(PetSpecie, { message: 'Tem que ser uma espécie valida' })
  @ApiProperty({ enum: PetSpecie })
  specie: PetSpecie;

  @IsString({ message: 'A raça do pet tem que ser uma String' })
  @IsNotEmpty({ message: 'Faltou informar a raça do pet' })
  @ApiProperty()
  breed: string;

  @IsEnum(PetSize, { message: 'Tem que ser um porte de pet valido' })
  @ApiProperty({ enum: PetSize })
  size: PetSize;

  @IsEnum(PetGender, { message: 'Tem que ser um gênero valido' })
  @ApiProperty({ enum: PetGender })
  gender: PetGender;

  @IsString({ message: 'Os problemas de saúde do pet tem que ser uma String' })
  @IsOptional()
  @ApiProperty({ required: false })
  healthProblems?: string;

  @IsString({ message: 'As alergias do pet tem que ser uma String' })
  @IsOptional()
  @ApiProperty({ required: false })
  allergies?: string;

  @IsString({
    message: 'As informações adicionais do pet tem que ser uma String',
  })
  @IsOptional()
  @ApiProperty({ required: false })
  additionalInfo?: string;

  @IsOptional()
  @IsBoolean({ message: 'O campo tem que ser um booleano' })
  @ApiProperty({ required: false })
  combo?: boolean;

  @IsString({ message: 'O Id do dono tem que ser uma String' })
  @ApiProperty()
  ownerId: string;
}

