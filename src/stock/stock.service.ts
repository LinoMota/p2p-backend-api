import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { WalletFilterDto } from 'src/wallet/dto/wallet-filter.dto'
import { Wallet } from 'src/wallet/entities/wallet.entity'
import { WalletRepository } from 'src/wallet/wallet.repository'
import { CreateStockDto } from './dto/create-stock.dto'
import { FinishStockDto } from './dto/finish-stock.dto'
import { StockFilterDto } from './dto/stock-filter.dto'
import { UpdateStockDto } from './dto/update-stock.dto'
import { StockRepository } from './stock.repository'

@Injectable()
export class StockService {
  constructor(
    private readonly stockRepository: StockRepository,
    private readonly walletRepository: WalletRepository,
  ) {}

  async create(createStockDto: CreateStockDto) {
    try {
      if (createStockDto.type == 'out') {
<<<<<<< Updated upstream
        const filter: WalletFilterDto = {
          userId: createStockDto.userId,
          linkedEntityId: createStockDto.brandId,
        }
        const finded = await this.walletRepository.findWallet(filter)
        console.log(finded, createStockDto)
=======
        const finded = await this.walletRepository.findWalletByUserId(
          createStockDto.userId,
        )

        const walletFiltered: Wallet = finded

        console.log(walletFiltered, 'walletFiltered')
>>>>>>> Stashed changes

        const walletFiltered: Wallet = finded[0]
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
    let stock: CreateStockDto = await this.findOne(id)

    stock = { ...stock, ...updateStockDto }

    let updatedUser = undefined
    console.log(stock)

    try {
      if (updateStockDto.state == 'CANCELED') {
        const filter: WalletFilterDto = {
          userId: stock.userId,
          linkedEntityId: stock.brandId,
        }
        const findedWallet = await this.walletRepository.findWallet(filter)
        if (findedWallet.length <= 0) {
          throw new BadRequestException({
            message: 'no wallet for this stock ',
          })
        }

        const currentWallet = findedWallet[0]

        if (stock.type == 'out') {
          await this.walletRepository.updateWallet(currentWallet.id, {
            ...currentWallet,

            balance: currentWallet.balance + stock.quantity,
          })
        }
      }
      updatedUser = await this.stockRepository.updateStock(id, stock)
    } catch (error) {
      const reason = error.response?.data?.message as string[]
      const message = 'Stock not updated'

      throw new BadRequestException(
        reason ? `${message}: ${reason.join(', ')}` : message,
      )
    }

    return updatedUser
  }

  async finishStock(id: string, finishStockDto: FinishStockDto) {
    try {
      const currentStock = await this.findOne(id)

      if (currentStock) {
        const filter: WalletFilterDto = {
          userId: finishStockDto.userId,
          linkedEntityId: currentStock.brandId,
        }
        const findedWallet = await this.walletRepository.findWallet(filter)

        const walletFiltered: Wallet[] = findedWallet.filter(
          (e) => e.linkedEntityId === currentStock.brandId,
        )

        if (walletFiltered.length <= 0) {
          throw new BadRequestException({
            message: 'no wallet for this stock ',
          })
        }

        const currentQuantity = finishStockDto.quantity ?? currentStock.quantity

        const currentWallet = walletFiltered[0]
        if (currentStock.type == 'out') {
          const newBalance = currentWallet.balance - currentQuantity

          if (newBalance <= 0) {
            throw new BadRequestException({ message: 'no wallet balance ' })
          }
          currentWallet.balance = newBalance
        } else {
          const newBalance = currentWallet.balance - currentQuantity

          if (currentWallet.balance < newBalance) {
            if (newBalance <= 0) {
              throw new BadRequestException({ message: 'no wallet balance ' })
            }
          }
          currentWallet.balance = newBalance
        }
        await this.walletRepository.updateWallet(
          currentWallet.id,
          currentWallet,
        )
        await this.stockRepository.updateStock(id, {
          ...currentStock,
          state: 'COMPLETED',
        })
        // update negotiations for this stock
      }
    } catch (error) {}
  }

  async remove(id: string) {
    const stock = await this.findOne(id)

    try {
      await this.stockRepository.deleteStock(id)
    } catch (error) {}

    return stock
  }
}
