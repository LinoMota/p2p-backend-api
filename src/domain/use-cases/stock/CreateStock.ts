import { injectable, inject } from 'tsyringe'

import Stock from '@entities/Stock'
import IStockRepository from '@irepositories/IStockRepository'
import ICreateStock from '@interfaces/use-cases/stock/ICreateStock'
import CouldNotCreateStockException from '@domain-exception/CouldNotCreateStockException'

@injectable()
export default class CreateStock implements ICreateStock {
  constructor(
    @inject('IStockRepository')
    private readonly repository: IStockRepository,
  ) {}

  async create(data: Partial<Stock>): Promise<Stock | CouldNotCreateStockException> {
    const newStock: Stock = {
      ...(data as Stock),
    }

    const persistedStock = await this.repository.createStock(newStock)

    if (persistedStock === undefined) {
      return new CouldNotCreateStockException()
    }

    return persistedStock as unknown as Stock
  }
}
