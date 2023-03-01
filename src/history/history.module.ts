import { Module } from '@nestjs/common'
import { HistoryService } from './history.service'
import { HistoryController } from './history.controller'
import { HistoryRepository } from './history.repository'
import { FarofaApiHttpConfig } from 'src/config/farofaApiHttp.config'
import { HttpModule } from 'nestjs-http-promise'

@Module({
  imports: [HttpModule.registerAsync({ useClass: FarofaApiHttpConfig })],

  controllers: [HistoryController],
  providers: [HistoryService, HistoryRepository],
})
export class HistoryModule {}
