import { ApiProperty } from '@nestjs/swagger';
import { PetGender, PetSize, PetSpecie } from '@prisma/client';

export class ResponsePetDto {
  @ApiProperty({ example: 'Juca' })
  readonly name: string;

  @ApiProperty({ enum: PetSpecie, example: PetSpecie.CACHORRO })
  readonly specie: PetSpecie;

  @ApiProperty({ example: 'Pastor Alemão' })
  readonly breed: string;

  @ApiProperty({ enum: PetSize, example: PetSize.GRANDE })
  readonly size: PetSize;

  @ApiProperty({ enum: PetGender, example: PetGender.FEMEA })
  readonly gender: PetGender;

  @ApiProperty({ required: false, example: 'Asma' })
  readonly healthProblems?: string;

  @ApiProperty({ required: false, example: 'Chocolate' })
  readonly allergies?: string;

  @ApiProperty({ required: false, example: 'Come chinelos' })
  readonly additionalInfo?: string;

  @ApiProperty({ required: false, example: false })
  readonly combo?: boolean;

  @ApiProperty()
  readonly ownerId: string;
}

