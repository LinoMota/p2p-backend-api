import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsIn, IsNotEmpty, IsString } from 'class-validator'

export class StockFilterDto {
  @IsString()
  @IsNotEmpty({ message: 'userId is required' })
  @ApiPropertyOptional()
  userId: string

  @IsString()
  @IsNotEmpty({ message: 'brandId is required' })
  @ApiPropertyOptional()
  brandId: string

  @IsString()
  @IsNotEmpty({ message: 'type is required' })
  @ApiPropertyOptional()
  @IsIn(['in', 'out'])
  type: 'in' | 'out'


}
