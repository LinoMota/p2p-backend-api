import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { UserBrand } from './entities/user-brand.entity'
import { UserBrandRepository } from './user-brand.repository'

@Injectable()
export class UserBrandService {
  constructor(private readonly userBrandRepository: UserBrandRepository) { }

  async login(
    cpf: string,
    password: string,
    brandId: string,
  ): Promise<UserBrand> {
    let user = null
    try {
      user = await this.userBrandRepository.login(cpf)
    } catch (error) {
      throw new NotFoundException('User not found')
    }
    const validatedUser = this.validateUser(user, password, brandId, cpf)

    if (!validatedUser) {
      throw new UnauthorizedException('Invalid password')
    }

    delete user.password;
    return user;

  }

  validateUser(
    user: UserBrand,
    password: string,
    brandId: string,
    cpf: string,
  ): boolean {
    if (user.brandId == brandId) {
      if (user.cpf == cpf) {
        if (user.password == password) {
          return true
        }
      }
    }
    return false
  }
}
