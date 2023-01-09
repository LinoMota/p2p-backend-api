import { injectable, inject } from 'tsyringe'
import IGetStock from '@interfaces/use-cases/stock/IGetStock'
import Stock from '@entities/Stock'
import IStockRepository from '@interfaces/repositories/IStockRepository'

@injectable()
export default class GetStock implements IGetStock {
  constructor(
    @inject('IStockRepository')
    private readonly repository: IStockRepository,
  ) {}

  async findUserStocks(id: string): Promise<Stock[] | undefined> {
    return await this.repository.getUserStocks(id)
  }
}
