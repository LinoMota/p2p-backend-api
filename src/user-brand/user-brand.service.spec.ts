import { Test, TestingModule } from '@nestjs/testing';
import { UserBrandService } from './user-brand.service';

describe('UserBrandService', () => {
  let service: UserBrandService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserBrandService],
    }).compile();

    service = module.get<UserBrandService>(UserBrandService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
