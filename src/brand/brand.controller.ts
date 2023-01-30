import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { BrandService } from './brand.service'

@Controller('brand')
@ApiTags('brands')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'page', required: false })
  stocksExplorer(@Query('limit') limit = 10, @Query('page') page = 1) {
    return this.brandService.find({ limit, page })
  }
}
