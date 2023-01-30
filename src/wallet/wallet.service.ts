import { BadRequestException, Injectable } from '@nestjs/common'
import { BrandService } from 'src/brand/brand.service'
import { UserService } from 'src/user/user.service'
import { CreateWalletDto } from './dto/create-wallet.dto'
import { UpdateWalletDto } from './dto/update-wallet.dto'
import { WalletRepository } from './wallet.repository'

@Injectable()
export class WalletService {
  constructor(
    private readonly userService: UserService,
    private readonly brandService: BrandService,
    private readonly walletRepository: WalletRepository,
  ) {}

  async create(createWalletDto: CreateWalletDto) {
    const { userId, linkedEntityId, type } = createWalletDto

    await this.validateWalletRules(userId, linkedEntityId, type)

    return await this.walletRepository.createWallet(createWalletDto)
  }

  async find() {
    return `This action returns all wallet`
  }

  async findOne(id: string) {
    let wallet = null

    try {
      wallet = await this.findOne(id)
    } catch (error) {
      throw new BadRequestException('Wallet not found')
    }

    return wallet
  }

  async update(id: string, updateWalletDto: UpdateWalletDto) {
    await this.findOne(id)

    const { userId, linkedEntityId, type } = updateWalletDto

    await this.validateWalletRules(userId, linkedEntityId, type)

    return await this.walletRepository.updateWallet(id, updateWalletDto)
  }

  async remove(id: string) {
    await this.findOne(id)

    return await this.walletRepository.deleteWallet(id)
  }

  async validateWalletRules(
    userId: string,
    linkedEntityId: string,
    type: string,
  ) {
    try {
      await this.userService.findOne(userId)
    } catch (error) {
      throw new BadRequestException('User not found')
    }

    if (type === 'currency') {
      throw new BadRequestException('Wallet type not supported yet')
    } else if (type === 'point') {
      try {
        await this.brandService.findOne(linkedEntityId)
      } catch (error) {}
    } else {
      throw new BadRequestException('Invalid wallet type')
    }
  }
}
