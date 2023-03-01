import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {
  IsBoolean,
  IsIn,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator'

export class CreateWalletDto {
  @IsString()
  @ApiProperty()
  linkedEntityId: string

  @ApiProperty()
  @IsString()
  userId: string

  @ApiProperty()
  @IsIn(['currency', 'point'])
  type: string

  @ApiPropertyOptional()
  @IsNumber()
  @IsPositive()
  balance: number

  @ApiPropertyOptional()
  @IsBoolean()
  active: boolean
}
