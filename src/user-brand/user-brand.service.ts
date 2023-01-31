import { Injectable } from '@nestjs/common';
import { UserBrand } from './entities/user-brand.entity';
import { UserBrandRepository } from './user-brand.repository';

@Injectable()
export class UserBrandService {
  constructor(private readonly userBrandRepository: UserBrandRepository) {}

  async login(
    cpf: string,
    pasword: string,
    brandId: string,
  ): Promise<UserBrand> {
    return await this.userBrandRepository.login(cpf, pasword, brandId)
  }
}
