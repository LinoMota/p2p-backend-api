import { ApiPropertyOptional } from '@nestjs/swagger'

import { IsIn, IsNumber, IsString } from 'class-validator'

export class NegotiationFilterDto {
  @IsString()
  @ApiPropertyOptional()
  requestedOrder?: string

  @IsString()
  @ApiPropertyOptional()
  userNegociating?: string

  @IsString()
  @ApiPropertyOptional()
  id?: string

  @IsString()
  @ApiPropertyOptional()
  @IsIn(['ACCEPTED', 'OPEN', 'DECLINED', 'CANCELED'])
  status?: string

  @IsNumber()
  @ApiPropertyOptional()
  value?: number
}
