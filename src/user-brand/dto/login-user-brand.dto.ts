import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class LoginUserBrandDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  cpf: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  brandId: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userId: string
}
