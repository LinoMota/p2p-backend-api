import { Test, TestingModule } from '@nestjs/testing';
import { ViaCepController } from './via-cep.controller';

describe('ViaCepController', () => {
  let controller: ViaCepController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ViaCepController],
    }).compile();

    controller = module.get<ViaCepController>(ViaCepController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
