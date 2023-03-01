import { ApiProperty } from '@nestjs/swagger'
import { IsIn, IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateStockDto {
  @IsString()
  @IsNotEmpty({ message: 'userId is required' })
  @ApiProperty()
  userId: string

  @IsString()
  @IsNotEmpty({ message: 'brandId is required' })
  @ApiProperty()
  brandId: string

  @IsString()
  @IsNotEmpty({ message: 'type is required' })
  @ApiProperty()
  @IsIn(['in', 'out'])
  type: 'in' | 'out'

  @IsNumber()
  @IsNotEmpty({ message: 'quantity is required' })
  @ApiProperty()
  quantity: number

  @IsString()
  @IsNotEmpty({ message: 'paymentMethod is required' })
  @ApiProperty()
  @IsIn(['pix', 'card', 'transfer'])
  paymentMethod: 'card' | 'transfer' | 'pix'

  @IsString()
  @IsNotEmpty({ message: 'state is required' })
  @ApiProperty()
  @IsIn(['COMPLETED', 'PENDING', 'CANCELED', 'OPEN'])
  state: 'COMPLETED' | 'PENDING' | 'CANCELED' | 'OPEN'
}
