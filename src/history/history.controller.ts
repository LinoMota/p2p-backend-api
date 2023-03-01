import { Controller, Get, Post, Body, Query } from '@nestjs/common'
import { HistoryService } from './history.service'
import { CreateHistoryDto } from './dto/create-history.dto'
import { FilterHistoryDto } from './dto/filter-history.dto'

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Post()
  create(@Body() createHistoryDto: CreateHistoryDto) {
    return this.historyService.create(createHistoryDto)
  }

  @Get()
  findAll(@Query() stockFilter: FilterHistoryDto) {
    return this.historyService.findAll(stockFilter)
  }
}
