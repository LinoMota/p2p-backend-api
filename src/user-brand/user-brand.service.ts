import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { WalletFilterDto } from 'src/wallet/dto/wallet-filter.dto'
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

      if (userBrand.length == 0) {
        throw new HttpException(
          'Wallet already created',
          HttpStatus.BAD_REQUEST,
        )
      }

      const findedUserBrand = userBrand.filter((e) => e.brandId == brandId)[0]

      const validatedUser = this.validateUser(
        findedUserBrand,
        password,
        brandId,
        cpf,
      )

      if (!validatedUser) {
        throw new HttpException('Forbidden', HttpStatus.UNAUTHORIZED)
      }
      const wallet: Wallet = {
        linkedEntityId: brandId,
        userId: _userId,
        type: 'point',
        balance: findedUserBrand.totalPoints,
        active: true,
      }

      const filter: WalletFilterDto = {
        userId: _userId,
      }
      const userWallets = await this.walletService.findWallet(filter)

      if (userWallets != null && userWallets != '') {
        const walletUserFiltered: Wallet[] = userWallets.filter(
          (e) => e.userId === _userId,
        )

        const findedBrand: Wallet[] = walletUserFiltered.filter(
          (e) => e.linkedEntityId == brandId,
        )

        if (findedBrand.length == 0) {
          await this.walletService.create(wallet)
        } else {
          throw new HttpException(
            'Wallet already created',
            HttpStatus.BAD_REQUEST,
          )
        }
      } else {
        await this.walletService.create(wallet)
      }
    } catch (error) {
      if (error) {
        return error
      }
      throw new NotFoundException('User not found')
    }
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
