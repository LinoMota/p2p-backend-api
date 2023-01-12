import Stock from '@entities/Stock'
import FarofaApiClient from '@infra/client/FarofaApiClient'
import IStockRepository from '@irepositories/IStockRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
export default class StockRepository implements IStockRepository {
  constructor(
    @inject('FarofaApiClient')
    private readonly farofaApiClient: FarofaApiClient,
  ) {}

  async getAllUsersStocks(exceptionId: String): Promise<Stock[] | undefined> {
    let response

    try {
      response = await this.farofaApiClient.get(`/stockExplorer?exceptionId=${exceptionId}`)
    } catch (error) {
      console.log(error)
    }

    return response as unknown as Stock[]
  }

  async findStockById(id: string): Promise<Stock | undefined> {
    let response

    try {
      response = await this.farofaApiClient.get(`/stock/${id}`)
    } catch (error) {
      console.log(error)
    }

    return response as unknown as Stock
  }

  async updateStock(id: string, data: Stock): Promise<Stock | undefined> {
    let response

    try {
      response = await this.farofaApiClient.put(`/stock/${id}`, data)
    } catch (error) {
      console.log(error)
    }

    return response as unknown as Stock
  }

  async createStock(data: Stock): Promise<Stock | undefined> {
    let response

    try {
      response = await this.farofaApiClient.post('/stock', data)
    } catch (error) {
      console.log(error)
    }

    return response as unknown as Stock
  }

  async getUserStocks(id: String): Promise<Stock[] | undefined> {
    let response

    try {
      response = await this.farofaApiClient.get(`/stock/findByUserId/${id}`)
    } catch (error) {
      console.log(error)
    }

    return response as unknown as Stock[]
  }
}
