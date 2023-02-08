import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { WalletFilterDto } from 'src/wallet/dto/wallet-filter.dto'
import { Wallet } from 'src/wallet/entities/wallet.entity'
import { WalletRepository } from 'src/wallet/wallet.repository'
import { CreateStockDto } from './dto/create-stock.dto'
import { StockFilterDto } from './dto/stock-filter.dto'
import { UpdateStockDto } from './dto/update-stock.dto'
import { StockRepository } from './stock.repository'

@Injectable()
export class StockService {
  constructor(
    private readonly stockRepository: StockRepository,
    private readonly walletRepository: WalletRepository,
  ) { }

  async create(createStockDto: CreateStockDto) {
    try {
      if (createStockDto.type == 'out') {
        const filter: WalletFilterDto = { userId: createStockDto.userId }
        const finded = await this.walletRepository.findWallet(filter)

        const walletFiltered: Wallet = finded.filter(
          (e) => e.linkedEntityId === createStockDto.brandId,
        )?.[0]

        const newBalance = walletFiltered.balance - createStockDto.quantity

        if (newBalance <= 0) {
          throw new BadRequestException({ message: 'no wallet balance ' })
        }
        walletFiltered.balance = newBalance

        await this.walletRepository.updateWallet(
          walletFiltered.id,
          walletFiltered,
        )
      }

      return await this.stockRepository.createStock(createStockDto)
    } catch (error) {
      const reason = error.response?.data?.message as string[]
      const message = 'Stock not created'

      throw new BadRequestException(
        reason ? `${message}: ${reason.join(', ')}` : message,
      )
    }
  }

  async find(stockFilter: StockFilterDto) {
    return await this.stockRepository.find(stockFilter)
  }

  async findOne(id: string) {
    let stock = undefined
    try {
      stock = await this.stockRepository.findStockById(id)
    } catch (error) {
      throw new NotFoundException('Stock not found')
    }

    return stock
  }

  async update(id: string, updateStockDto: UpdateStockDto) {
    let stock = await this.findOne(id)

    stock = { ...stock, ...updateStockDto }

    let updatedUser = undefined

    try {
      updatedUser = await this.stockRepository.updateStock(id, stock)
    } catch (error) {
      const reason = error.response?.data?.message as string[]
      const message = 'User not updated'

      throw new BadRequestException(
        reason ? `${message}: ${reason.join(', ')}` : message,
      )
    }

    return updatedUser
  }

  async remove(id: string) {
    const stock = await this.findOne(id)

    try {
      await this.stockRepository.deleteStock(id)
    } catch (error) { }

    return stock
  }
}
