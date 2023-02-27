import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class FilterHistoryDto {
  @IsString()
  @IsNotEmpty({ message: 'userId is required' })
  @ApiProperty()
  userId: string
}
