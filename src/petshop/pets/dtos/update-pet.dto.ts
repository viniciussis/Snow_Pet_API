import { CreatePetDto } from './create-pet.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdatePetDto extends PartialType(CreatePetDto) {}
