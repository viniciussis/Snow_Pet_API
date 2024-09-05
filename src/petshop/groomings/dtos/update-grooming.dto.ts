import { CreateGroomingDto } from './create-grooming.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateGroomingDto extends PartialType(CreateGroomingDto) {}
