import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LocalAuthDto {
  @ApiProperty({ uniqueItems: true, example: 'vinicius@example.com' })
  @IsEmail(undefined, { message: 'O email precisa ser válido...' })
  email: string;

  @ApiProperty({
    example: '123@Mudar',
  })
  @IsNotEmpty({ message: 'Faltou informar a senha...' })
  password: string;
}
