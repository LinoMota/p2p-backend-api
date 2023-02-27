import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { environment } from './config/environment.config'
import { StockModule } from './stock/stock.module'
import { BrandModule } from './brand/brand.module'
import { WalletModule } from './wallet/wallet.module'
import { ViaCepModule } from './via-cep/via-cep.module'
import { UserBrandModule } from './user-brand/user-brand.module'
import { NegotiationModule } from './negotiation/negotiation.module'
import { HistoryModule } from './history/history.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [environment],
    }),

    UserModule,
    AuthModule,
    StockModule,
    BrandModule,
    WalletModule,
    ViaCepModule,
    UserBrandModule,
    NegotiationModule,
    HistoryModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
