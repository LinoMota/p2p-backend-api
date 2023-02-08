import { Module } from '@nestjs/common';
import { NegotiationService } from './negotiation.service';
import { NegotiationController } from './negotiation.controller';

@Module({
  controllers: [NegotiationController],
  providers: [NegotiationService]
})
export class NegotiationModule {}
