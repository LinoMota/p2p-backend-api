import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsIn, IsString } from 'class-validator'

export class FinishNegotiaton {
    @IsString()
    @ApiPropertyOptional()
    @IsIn(['ACCEPTED', 'OPEN', 'DECLINED', 'CANCELED'])
    status: string
}
