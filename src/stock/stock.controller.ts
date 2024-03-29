import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
} from '@nestjs/common'
import { StockService } from './stock.service'
import { CreateStockDto } from './dto/create-stock.dto'
import { UpdateStockDto } from './dto/update-stock.dto'
import { StockFilterDto } from './dto/stock-filter.dto'
import { FinishStockDto } from './dto/finish-stock.dto'

@ApiTags('stock')
@ApiBearerAuth('access-token')
@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) { }

  @Post()
  create(@Body() createStockDto: CreateStockDto) {
    return this.stockService.create(createStockDto)
  }

  @Get()
  find(@Query() stockFilter: StockFilterDto) {
    return this.stockService.find(stockFilter)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stockService.findOne(id)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateStockDto: UpdateStockDto) {
    return this.stockService.update(id, updateStockDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stockService.remove(id)
  }

  @Post('finish/:id')
  finishStock(@Param('id') id: string, @Body() finishStockDto: FinishStockDto) {
    return this.stockService.finishStock(id, finishStockDto)
  }
}
