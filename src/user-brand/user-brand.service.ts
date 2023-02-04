import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Wallet } from 'src/wallet/entities/wallet.entity'
import { WalletService } from 'src/wallet/wallet.service'
import { UserBrand } from './entities/user-brand.entity'
import { UserBrandRepository } from './user-brand.repository'

@Injectable()
export class UserBrandService {
  constructor(
    private readonly userBrandRepository: UserBrandRepository,
    private readonly walletService: WalletService,
  ) { }

  async login(
    cpf: string,
    password: string,
    brandId: string,
    _userId: string,
  ): Promise<void> {
    try {
      const userBrand = await this.userBrandRepository.login(cpf)

      const validatedUser = this.validateUser(userBrand, password, brandId, cpf)

      if (!validatedUser) {
        throw new HttpException('Forbidden', HttpStatus.BAD_REQUEST);

      }

      const wallet: Wallet = {
        linkedEntityId: brandId,
        userId: _userId,
        type: 'point',
        balance: userBrand.totalPoints,
        active: true,
      }

      const userWallets = await this.walletService.findWalletByUserId(_userId)

      if (userWallets != null && userWallets != '') {
        const walletFiltered: Wallet[] = [userWallets].filter(
          (e) => e.userId === _userId,
        )
        if (walletFiltered.length == 0) {
          await this.walletService.create(wallet)
        } else {
          throw new Error('Wallet already created')
        }
      } else {
        await this.walletService.create(wallet)
      }
    } catch (error) {
      throw error;
    }
  }

  validateUser(
    userBrand: UserBrand,
    password: string,
    brandId: string,
    cpf: string,
  ): boolean {
    if (userBrand.brandId == brandId) {
      if (userBrand.cpf == cpf) {
        if (userBrand.password == password) {
          return true
        }
      }
    }
    return false
  }
}
