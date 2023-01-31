import { Controller } from '@nestjs/common';
import { UserBrandService } from './user-brand.service';

@Controller('user-brand')
export class UserBrandController {
  constructor(private readonly userBrandService: UserBrandService) {}
}
