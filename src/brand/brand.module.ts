import { HttpModule } from 'nestjs-http-promise'
import { Module } from '@nestjs/common'
import { BrandService } from './brand.service'
import { BrandController } from './brand.controller'
import BrandRepository from './brand.repository'
import { FarofaApiHttpConfig } from 'src/config/farofaApiHttp.config'

@Module({
  imports: [HttpModule.registerAsync({ useClass: FarofaApiHttpConfig })],
  controllers: [BrandController],
  providers: [BrandService, BrandRepository,],
  exports: [BrandService, BrandRepository],
})
export class BrandModule { }
