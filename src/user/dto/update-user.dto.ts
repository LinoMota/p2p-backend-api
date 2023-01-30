import { PartialType } from '@nestjs/mapped-types'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsDate, IsIn, IsString } from 'class-validator'
import { CreateUserDto } from './create-user.dto'

class Address {
  @IsString()
  @ApiProperty()
  uf: string

  @IsString()
  @ApiProperty()
  city: string

  @IsString()
  @ApiProperty()
  street: string

  @IsString()
  @ApiProperty()
  number: string

  @IsString()
  @ApiProperty()
  zipCode: string

  @IsString()
  @ApiProperty()
  country: string

  @IsString()
  @ApiPropertyOptional()
  complement: string

  @IsString()
  @ApiProperty()
  neighborhood: string
}

class BankAccount {
  @IsString()
  @ApiProperty()
  name: string

  @IsString()
  @ApiProperty()
  agency: string

  @IsString()
  @ApiProperty()
  account: string

  @IsString()
  @ApiProperty()
  @IsIn(['corrente', 'poupança'])
  type: string

  @IsString()
  @ApiProperty()
  bankCode: string
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @ApiPropertyOptional()
  cpf?: string

  @IsString()
  @ApiPropertyOptional()
  phone?: string

  @IsDate()
  @ApiPropertyOptional()
  birthDate?: Date

  @ApiPropertyOptional()
  address?: Address

  @ApiPropertyOptional()
  bankAccount?: BankAccount
}
