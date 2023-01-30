import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { CreateStockDto } from './dto/create-stock.dto'
import { UpdateStockDto } from './dto/update-stock.dto'
import { StockRepository } from './stock.repository'

@Injectable()
export class StockService {
  constructor(private readonly stockRepository: StockRepository) {}

  async create(createStockDto: CreateStockDto) {
    let createdStock = undefined

    try {
      createdStock = await this.stockRepository.createStock(createStockDto)
    } catch (error) {
      const reason = error.response?.data?.message as string[]
      const message = 'Stock not created'

      throw new BadRequestException(
        reason ? `${message}: ${reason.join(', ')}` : message,
      )
    }

    return createdStock
  }

  async find() {
    return await this.stockRepository.find()
  }

  async findOne(id: string) {
    let stock = undefined
    try {
      stock = await this.stockRepository.findStockById(id)
    } catch (error) {
      throw new NotFoundException('User not found')
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
    } catch (error) {}

    return stock
  }
}
