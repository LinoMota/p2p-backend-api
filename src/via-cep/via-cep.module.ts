import { ViaCepApiHttpConfig } from './../config/viaCepApiHttp.config'
import { Module } from '@nestjs/common'
import { ViaCepService } from './via-cep.service'
import { HttpModule } from 'nestjs-http-promise'
import { ViaCepController } from './via-cep.controller'

@Module({
  imports: [HttpModule.registerAsync({ useClass: ViaCepApiHttpConfig })],
  providers: [ViaCepService],
  exports: [ViaCepService],
  controllers: [ViaCepController],
})
export class ViaCepModule {}
