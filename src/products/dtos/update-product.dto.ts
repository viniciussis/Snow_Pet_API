import { IsOptional, IsString, IsNumber, IsMongoId } from "class-validator";

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  brand?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsString()
  measure?: string;

  @IsOptional()
  @IsMongoId()
  categotyId?: string;
}
