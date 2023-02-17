import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common'
import { NegotiationService } from './negotiation.service'
import { CreateNegotiationDto } from './dto/create-negotiation.dto'
import { NegotiationFilterDto } from './dto/negotiation-filter.dto'
import { ApiTags } from '@nestjs/swagger'

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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.negotiationService.findOne(id)
  }
}
