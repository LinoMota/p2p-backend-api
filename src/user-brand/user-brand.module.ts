import { Module } from '@nestjs/common'
import { HttpModule } from 'nestjs-http-promise/dist/http.module'
import BrandRepository from 'src/brand/brand.repository'
import { BrandService } from 'src/brand/brand.service'
import { FarofaApiHttpConfig } from 'src/config/farofaApiHttp.config'
import { UserRepository } from 'src/user/user.repository'
import { UserService } from 'src/user/user.service'
import { WalletRepository } from 'src/wallet/wallet.repository'
import { WalletService } from 'src/wallet/wallet.service'
import { UserBrandController } from './user-brand.controller'
import { UserBrandRepository } from './user-brand.repository'
import { UserBrandService } from './user-brand.service'

@Module({
  imports: [HttpModule.registerAsync({ useClass: FarofaApiHttpConfig })],

  controllers: [UserBrandController],
  providers: [
    UserBrandService,
    UserBrandRepository,
    WalletService,
    WalletRepository,
    UserService,
    UserRepository,
    BrandService,
    BrandRepository,
  ],
  exports: [UserBrandService, UserBrandRepository],
})
export class UserBrandModule { }
