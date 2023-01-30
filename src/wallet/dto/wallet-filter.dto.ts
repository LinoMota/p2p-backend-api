import { ApiPropertyOptional } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import {
  IsBoolean,
  IsIn,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator'

export class WalletFilterDto {
  @IsString()
  @ApiPropertyOptional()
  linkedEntityId?: string

  @ApiPropertyOptional()
  @IsString()
  userId?: string

  @ApiPropertyOptional({
    enum: ['currency', 'point'],
  })
  @IsIn(['currency', 'point'])
  type?: string

  @ApiPropertyOptional()
  @IsNumber()
  @IsPositive()
  balance?: number

  @ApiPropertyOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  active?: boolean
}
