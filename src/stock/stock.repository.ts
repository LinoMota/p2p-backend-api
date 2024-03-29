import { Injectable } from '@nestjs/common'
import { HttpService } from 'nestjs-http-promise'
import { StockFilterDto } from './dto/stock-filter.dto'
import { Stock } from './entities/stock.entity'

@Injectable()
export class StockRepository {
  constructor(private readonly httpService: HttpService) { }

  async find(stockFilter: StockFilterDto) {
    const { data } = await this.httpService.get(`/stock/`, {
      params: stockFilter,
    })
    return data
  }

  async findStockById(id: string) {
    const { data } = await this.httpService.get(`/stock/${id}`)
    return data
  }

  async createStock(stock: Partial<Stock>) {
    const { data } = await this.httpService.post(`/stock`, stock)
    return data
  }

  async updateStock(id: string, stock: Partial<Stock>) {
    const { data } = await this.httpService.put(`/stock/${id}`, stock)
    return data
  }

  async deleteStock(id: string) {
    const { data } = await this.httpService.delete(`/stock/${id}`)
    return data
  }
}
