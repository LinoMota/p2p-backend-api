import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Put,
  Query,
} from '@nestjs/common'
import { WalletService } from './wallet.service'
import { CreateWalletDto } from './dto/create-wallet.dto'
import { UpdateWalletDto } from './dto/update-wallet.dto'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { WalletFilterDto } from './dto/wallet-filter.dto'

@Controller('wallet')
@ApiTags('wallet')
@ApiBearerAuth('access-token')
export class WalletController {
  constructor(private readonly walletService: WalletService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createWalletDto: CreateWalletDto) {
    return this.walletService.create(createWalletDto)
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.walletService.findOne(id)
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getWallet(@Query() walletFilterDto: WalletFilterDto) {
    return this.walletService.findWallet(walletFilterDto)
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateWalletDto: UpdateWalletDto) {
    return this.walletService.update(id, updateWalletDto)
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.walletService.remove(id)
  }
}
