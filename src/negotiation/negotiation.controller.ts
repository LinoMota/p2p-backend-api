import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
} from '@nestjs/common'
import { NegotiationService } from './negotiation.service'
import { CreateNegotiationDto } from './dto/create-negotiation.dto'
import { NegotiationFilterDto } from './dto/negotiation-filter.dto'
import { ApiTags } from '@nestjs/swagger'
import { FinishNegotiaton } from './dto/finish-negotiation.dto'

@ApiTags('negotiation')
@Controller('negotiation')
export class NegotiationController {
  constructor(private readonly negotiationService: NegotiationService) { }

  @Post()
  create(@Body() createNegotiationDto: CreateNegotiationDto) {
    return this.negotiationService.create(createNegotiationDto)
  }

  @Get()
  find(@Query() negotiationFilterDto: NegotiationFilterDto) {
    return this.negotiationService.findAll(negotiationFilterDto)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() negotiationFilterDto: NegotiationFilterDto,
  ) {
    return this.negotiationService.update(id, negotiationFilterDto)
  }

  @Post('finish/:id')
  finish(@Param('id') id: string, @Body() finishDto: FinishNegotiaton) {
    return this.negotiationService.finish(id, finishDto)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.negotiationService.findOne(id)
  }
}
