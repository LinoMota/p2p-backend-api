import { Test, TestingModule } from '@nestjs/testing';
import { NegotiationController } from './negotiation.controller';
import { NegotiationService } from './negotiation.service';

describe('NegotiationController', () => {
  let controller: NegotiationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NegotiationController],
      providers: [NegotiationService],
    }).compile();

    controller = module.get<NegotiationController>(NegotiationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
