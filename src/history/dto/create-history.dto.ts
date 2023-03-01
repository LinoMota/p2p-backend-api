import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsString, IsIn } from 'class-validator'

export class CreateHistoryDto {
  @IsString()
  @IsNotEmpty({ message: 'name is required' })
  @ApiProperty()
  userId: string

  @IsString()
  @IsNotEmpty({ message: 'name is required' })
  @ApiProperty()
  brandId: string

  @IsNumber()
  @IsNotEmpty({ message: 'milion value  is required' })
  @ApiProperty()
  value: number

  @IsNumber()
  @IsNotEmpty({ message: 'milion value  is required' })
  @ApiProperty()
  quantity: number

  @IsString()
  @IsNotEmpty({ message: 'type is required' })
  @ApiProperty()
  @IsIn(['in', 'out'])
  type: string

  @IsString()
  @IsNotEmpty({ message: 'paymentMethod is required' })
  @ApiProperty()
  @IsIn(['pix', 'card', 'transfer'])
  paymentMethod: string
}
