import { HttpModule } from 'nestjs-http-promise'
import { Module } from '@nestjs/common'
import { StockService } from './stock.service'
import { StockController } from './stock.controller'
import { StockRepository } from './stock.repository'
import { FarofaApiHttpConfig } from 'src/config/farofaApiHttp.config'
import { WalletRepository } from 'src/wallet/wallet.repository'
import { WalletService } from 'src/wallet/wallet.service'
import { UserService } from 'src/user/user.service'
import { BrandService } from 'src/brand/brand.service'
import { UserRepository } from 'src/user/user.repository'
import BrandRepository from 'src/brand/brand.repository'

@Module({
  imports: [HttpModule.registerAsync({ useClass: FarofaApiHttpConfig })],
  controllers: [StockController],
  providers: [
    StockService,
    WalletRepository,
    StockRepository,
    WalletService,
    UserService,
    BrandService,
    UserRepository,
    BrandRepository,
  ],
  exports: [StockRepository],
})
export class StockModule { }
