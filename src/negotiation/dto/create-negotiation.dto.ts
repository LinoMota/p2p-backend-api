import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsIn, IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateNegotiationDto {
    @IsString()
    @IsNotEmpty({ message: 'requestedOrder is required' })
    @ApiProperty()
    requestedOrder: string

    @IsNumber()
    @IsNotEmpty({ message: 'offeredValue  is required' })
    @ApiProperty()
    offeredValue: number

    @IsString()
    @IsNotEmpty({ message: 'userNegociating  is required' })
    @ApiProperty()
    userNegociating: string

    @IsString()
    @ApiPropertyOptional()
    @IsIn(['ACCEPTED', 'OPEN', 'DECLINED', 'CANCELED'])
    status: string
}
