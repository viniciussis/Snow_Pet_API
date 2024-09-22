import { IsEmail, IsEnum, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class SignupDto {
  @ApiProperty({ minLength: 5, example: 'Fulano de Tal' })
  @MinLength(5, { message: 'O nome tem que ter no mínimo 5 caracteres...' })
  readonly name: string;

  @ApiProperty({ uniqueItems: true, example: 'fulano@example.com' })
  @IsEmail(undefined, { message: 'O email precisa ser válido...' })
  readonly email: string;

  @ApiProperty({ example: '123@mudar' })
  @MinLength(8, { message: 'A senha tem que ter no mínimo 8 caracteres...' })
  readonly password: string;

  @ApiProperty({ enum: Role, example: Role.CUSTOMER })
  @IsEnum(Role, { message: 'Informe um nível de acesso válido...' })
  readonly role: Role;
}
