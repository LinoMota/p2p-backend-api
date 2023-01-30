import { BrandModule } from './../brand/brand.module'
import { Module } from '@nestjs/common'
import { WalletService } from './wallet.service'
import { WalletController } from './wallet.controller'
import { UserModule } from 'src/user/user.module'
import { HttpModule } from 'nestjs-http-promise'
import { BrandService } from 'src/brand/brand.service'
import { FarofaApiHttpConfig } from 'src/config/farofaApiHttp.config'
import { UserService } from 'src/user/user.service'
import { WalletRepository } from './wallet.repository'

@Module({
  imports: [
    HttpModule.registerAsync({ useClass: FarofaApiHttpConfig }),
    BrandModule,
    UserModule,
  ],
  controllers: [WalletController],
  providers: [WalletService, WalletRepository, UserService, BrandService],
})
export class WalletModule {}
