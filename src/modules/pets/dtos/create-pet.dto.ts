import { IsString, IsBoolean, IsNotEmpty } from 'class-validator';

export class CreatePetDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  @IsNotEmpty()
  specie: string;

  @IsString()
  @IsNotEmpty()
  breed: string;

  @IsNotEmpty()
  @IsString()
  size: string;

  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsString()
  healthProblems?: string;

  @IsString()
  allergies?: string;

  @IsString()
  additionalInfo?: string;

  @IsString()
  ownerId: string;

  @IsBoolean()
  combo?: boolean;
}
