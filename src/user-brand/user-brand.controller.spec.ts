import { Test, TestingModule } from '@nestjs/testing';
import { UserBrandController } from './user-brand.controller';
import { UserBrandService } from './user-brand.service';

describe('UserBrandController', () => {
  let controller: UserBrandController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserBrandController],
      providers: [UserBrandService],
    }).compile();

    controller = module.get<UserBrandController>(UserBrandController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
