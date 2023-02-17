import { ApiPropertyOptional } from '@nestjs/swagger'

import { IsIn, IsString } from 'class-validator'

export class NegotiationFilterDto {
  @IsString()
  @ApiPropertyOptional()
  requestedOrder: string

  @IsString()
  @ApiPropertyOptional()
  userNegociating: string

  @IsString()
  @ApiPropertyOptional()
  id: string

  @IsString()
  @ApiPropertyOptional()
  @IsIn(['ACCEPTED', 'DECLINED'])
  status: string
}
