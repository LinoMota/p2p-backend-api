import { HttpModule } from 'nestjs-http-promise'
import { Module } from '@nestjs/common'
import { StockService } from './stock.service'
import { StockController } from './stock.controller'
import { StockRepository } from './stock.repository'
import { FarofaApiHttpConfig } from 'src/config/farofaApiHttp.config'

@Module({
  imports: [HttpModule.registerAsync({ useClass: FarofaApiHttpConfig })],
  controllers: [StockController],
  providers: [StockService, StockRepository],
  exports: [StockRepository],
})
export class StockModule {}
