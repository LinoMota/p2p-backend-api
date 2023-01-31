import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class LoginUserBrandDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  cpf: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string
}
