import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class FinishStockDto {
    @IsString()
    @IsNotEmpty({ message: 'userId is required' })
    @ApiProperty()
    userId: string

    @IsNumber()
    @IsNotEmpty({ message: 'quantity is required' })
    @ApiPropertyOptional()
    quantity: number
}
