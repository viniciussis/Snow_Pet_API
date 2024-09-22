import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SigninDto {
  @ApiProperty({ uniqueItems: true, example: 'vini@example.com' })
  @IsEmail(undefined, { message: 'O email precisa ser válido...' })
  email: string;

  @ApiProperty({
    example: '123@mudar',
  })
  @IsNotEmpty({ message: 'Faltou informar a senha...' })
  password: string;
}
