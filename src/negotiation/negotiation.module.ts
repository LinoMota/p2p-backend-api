import { Module } from '@nestjs/common'
import { NegotiationService } from './negotiation.service'
import { NegotiationController } from './negotiation.controller'
import NegotiationRepository from './negotiation.repository'
import { FarofaApiHttpConfig } from 'src/config/farofaApiHttp.config'
import { HttpModule } from 'nestjs-http-promise'
import { StockRepository } from 'src/stock/stock.repository'
import { WalletRepository } from 'src/wallet/wallet.repository'

@Module({
  imports: [HttpModule.registerAsync({ useClass: FarofaApiHttpConfig })],

  controllers: [NegotiationController],
  providers: [
    NegotiationService,
    NegotiationRepository,
    StockRepository,
    WalletRepository,
  ],
  exports: [NegotiationRepository],
})
export class NegotiationModule { }
