import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common'
import { StockService } from './stock.service'
import { CreateStockDto } from './dto/create-stock.dto'
import { UpdateStockDto } from './dto/update-stock.dto'

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
  find() {
    return this.stockService.find()
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
}
